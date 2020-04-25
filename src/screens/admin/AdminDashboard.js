import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminDashboardCard from './components/AdminDashboardCard';
import {
  getOwnerRecordsForProjectGroup,
  inviteMember,
  triggerEmail,
  toggleValidColor,
  validateField
} from '../../lib/adminUtils';
import '../../styles/main.css';
import '../../styles/AdminDashboard.css';
import { isSuperAdmin } from '../../lib/credentials';
import Success from '../../assets/success.png';
import { updateOwner } from '../../lib/airtable/request';

const ROOT_ELEMENT = '#root';
Modal.setAppElement(ROOT_ELEMENT);

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminEditMode: false,
      owners: [],
      showModal: false,
      showSuccessModal: false,
      showAdminModal: false,
      inviteFirstName: '',
      inviteLastName: '',
      invitePhoneNumber: '',
      inviteEmail: '',
      inviteShareAmount: '',
      inviteWantsDividends: true,
      status: '',
      displayAdminInfo: '',
      updatedPhoneNumber: '',
      updatedEmail: '',
      updatedAddress: '',
      errors: {}
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.handleContactEdit = this.handleContactEdit.bind(this);
  }

  componentDidMount() {
    this.fetchOwnerRecords();
  }

  componentDidUpdate(prevProps) {
    const { projectGroup } = this.props;
    if (prevProps.projectGroup !== projectGroup) {
      this.fetchOwnerRecords();
    }
  }

  handleChange = event => {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
    });
  };

  handleAdminChange = owner => {
    const { displayAdmin } = this.state;

    this.setState({
      displayAdminInfo: owner,
      updatedEmail: owner.email,
      updatedPhoneNumber: owner.phoneNumber,
      updatedAddress: owner.permanentAddress,
      showAdminModal: !displayAdmin
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      status: 'Sending...'
    });

    const {
      inviteFirstName,
      inviteLastName,
      invitePhoneNumber,
      inviteEmail,
      inviteShareAmount
    } = this.state;

    const { projectGroup } = this.props;

    const newPledgeInvite = {
      firstName: inviteFirstName,
      lastName: inviteLastName,
      phoneNumber: invitePhoneNumber,
      email: inviteEmail,
      shareAmount: parseInt(inviteShareAmount, 10),
      projectGroupId: projectGroup.id
    };

    const errors = {};
    let foundErrors = false;
    const fields = [
      'inviteFirstName',
      'inviteLastName',
      'invitePhoneNumber',
      'inviteEmail',
      'inviteShareAmount'
    ];

    const errorMessages = await Promise.all(
      fields.map(field => validateField(field, this.state[field]))
    );
    errorMessages.forEach((errorMessage, i) => {
      errors[fields[i]] = errorMessage;
      if (errorMessage !== '') {
        foundErrors = true;
      }
    });

    this.setState({
      errors
    });

    if (!foundErrors) {
      const pledgeInviteId = await inviteMember(newPledgeInvite);

      if (pledgeInviteId === '') {
        this.setState({
          status: 'An error occurent when sending the invitation.'
        });
      }

      const emailStatus = await triggerEmail(pledgeInviteId);

      if (emailStatus === 'error') {
        this.setState({
          status: 'An error occurent when sending the invitation.'
        });
      } else {
        this.setState({
          status: emailStatus,
          showModal: false,
          showSuccessModal: true
        });
      }
    }
  };

  validateContactAndSubmitData = async () => {
    const {
      updatedEmail,
      // updatedAddress,
      updatedPhoneNumber,
      displayAdminInfo
    } = this.state;
    const newOwner = {
      phoneNumber: updatedPhoneNumber,
      email: updatedEmail
    };
    // const errors = {};
    // let foundErrors = false;
    // const fields = ['updatedEmail', 'updatedAddress', 'updatedPhoneNumber'];

    // const errorMessages = await Promise.all(
    //   fields.map(field => validateField(field, newOwner[field]))
    // );
    // errorMessages.forEach((errorMessage, i) => {
    //   const fieldName = `update${fields[i].charAt(0).toUpperCase() +
    //     fields[i].slice(1)}`;
    //   errors[fieldName] = errorMessage;
    //   if (errorMessage !== '') {
    //     foundErrors = true;
    //   }
    // });

    // this.setState({
    //   errors
    // });

    // if (!foundErrors) {
    await updateOwner(displayAdminInfo.id, newOwner);
    // }
  };

  async fetchOwnerRecords() {
    const { projectGroup } = this.props;
    const ownerRecords = await getOwnerRecordsForProjectGroup(projectGroup);
    this.setState({
      owners: ownerRecords
    });
  }

  /* open/close modal logic */
  handleOpenModal(modal) {
    switch (modal) {
      case 'invite':
        this.setState({ showModal: true });
        break;
      case 'success':
        this.setState({ showSuccessModal: true });
        break;
      case 'admin':
        this.setState({ showAdminModal: true });
        break;
      default:
        break;
    }
  }

  handleCloseModal(modal) {
    switch (modal) {
      case 'invite':
        this.setState({ showModal: false });
        break;
      case 'success':
        this.setState({ showSuccessModal: false });
        break;
      case 'admin':
        this.setState({ showAdminModal: false });
        break;
      default:
        break;
    }
  }

  handleContactEdit(type) {
    switch (type) {
      case 'edit':
        this.setState({ adminEditMode: true });
        break;
      case 'cancel':
        this.setState({ adminEditMode: false });
        break;
      case 'save':
        this.validateAndSubmitData();
        this.setState({ adminEditMode: false });
        break;
      default:
        break;
    }
  }

  render() {
    const { credentials, projectGroup } = this.props;
    const {
      showModal,
      showSuccessModal,
      showAdminModal,
      displayAdminInfo,
      owners,
      inviteFirstName,
      inviteLastName,
      invitePhoneNumber,
      inviteEmail,
      inviteShareAmount,
      adminEditMode,
      updatedEmail,
      updatedPhoneNumber,
      updatedAddress,
      errors
    } = this.state;

    return (
      <div className="dashboard dash-admin">
        <div className="container">
          <div className="flex justify-content-space pb-5">
            <h3 className="admin-project-group">{projectGroup.name}</h3>
            {isSuperAdmin(credentials) && (
              <Link to="/superadmin" className="super-admin-link">
                Super Admin Dashboard{' '}
                <span role="img" aria-label="shh">
                  🤫
                </span>
              </Link>
            )}
          </div>
          <div className="admin-holder">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4 className="admin-members-text">
                Members <span className="admin-number ">({owners.length})</span>
              </h4>
              <button
                type="button"
                className="btn btn--square btn--pink btn--size16 btn--weight600 invite-button"
                onClick={() => this.handleOpenModal('invite')}
              >
                Invite
              </button>
            </div>
            <div className="admin-card-holder">
              {owners.length >= 1 ? (
                owners.map(owner => {
                  return (
                    <AdminDashboardCard
                      key={owner.id}
                      owner={owner}
                      handleAdminChange={this.handleAdminChange}
                    />
                  );
                })
              ) : (
                <div className="white-text">
                  No owners to be displayed in this project group
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Modal for Inviting a memeber */}
        <Modal
          isOpen={showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={() => this.handleCloseModal('invite')}
          className="admin-modal"
          overlayClassName="admin-modal-overlay"
        >
          <h3>Invite a Member to {projectGroup.name}</h3>
          <div className="admin-invite-form">
            <form onSubmit={this.handleSubmit}>
              <div className="admin-invite-form-row">
                <div className="">
                  <div className="flex-col">
                    <label htmlFor="inviteFirstName">
                      <div className="admin-invite-form-label-wrapper">
                        First name{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="inviteFirstName"
                        placeholder="Aivant"
                        className={`${toggleValidColor(
                          errors.inviteFirstName,
                          0
                        )}
                        admin-invite-form-input`}
                        value={inviteFirstName}
                        onChange={this.handleChange}
                      />
                    </label>
                    <div className="w-50 pr-1 validation">
                      {toggleValidColor(errors.inviteFirstName, 1)}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex-col">
                    <label htmlFor="inviteLastName">
                      <div className="admin-invite-form-label-wrapper">
                        Last name{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="inviteLastName"
                        placeholder="Goyal"
                        className={`${toggleValidColor(
                          errors.inviteLastName,
                          0
                        )}
                        admin-invite-form-input`}
                        value={inviteLastName}
                        onChange={this.handleChange}
                      />
                    </label>
                    <div className="w-50 pr-1 validation">
                      {toggleValidColor(errors.inviteLastName, 1)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-invite-form-row">
                <div className="">
                  <div className="flex-col">
                    <label htmlFor="invitePhoneNumber">
                      <div className="admin-invite-form-label-wrapper">
                        Phone number{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="invitePhoneNumber"
                        placeholder="123-456-7890"
                        className={`${toggleValidColor(
                          errors.invitePhoneNumber,
                          0
                        )}
                        admin-invite-form-input`}
                        value={invitePhoneNumber}
                        onChange={this.handleChange}
                      />
                    </label>
                    <div className="w-50 pr-1 validation">
                      {toggleValidColor(errors.invitePhoneNumber, 1)}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex-col">
                    <label htmlFor="inviteEmail">
                      <div className="admin-invite-form-label-wrapper">
                        Email{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="inviteEmail"
                        placeholder="invitees_email@gmail.com"
                        className={`${toggleValidColor(errors.inviteEmail, 0)}
                        admin-invite-form-input`}
                        value={inviteEmail}
                        onChange={this.handleChange}
                      />
                    </label>
                    <div className="w-50 pr-1 validation">
                      {toggleValidColor(errors.inviteEmail, 1)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-invite-form-row">
                <div className="">
                  <div className="flex-col">
                    <label htmlFor="inviteShareAmount">
                      Number of shares
                      <input
                        type="text"
                        name="inviteShareAmount"
                        placeholder="Number between 1 to 10"
                        className={`${toggleValidColor(
                          errors.inviteShareAmount,
                          0
                        )}
                        admin-invite-form-input`}
                        value={inviteShareAmount}
                        onChange={this.handleChange}
                      />
                    </label>
                    <div className="w-50 pr-1 validation">
                      {toggleValidColor(errors.inviteShareAmount, 1)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-invite-form-row admin-invite-form-row-submit">
                <div className="">
                  <input
                    type="submit"
                    value="Send Invite"
                    className="admin-invite-form-submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal>
        {/* Success modal for invite  */}
        <Modal
          isOpen={showSuccessModal}
          onRequestClose={() => this.handleCloseModal('success')}
          className="invite-success-modal"
          overlayClassName="admin-modal-overlay"
        >
          <div className="invite-success-container">
            <img src={Success} alt="success" className="invite-success-icon" />
            <h2 className="invite-success-title">
              Your invitation is on it&apos;s away!
            </h2>
            <div className="invite-success-description">
              We’ve sent your invitation to{' '}
              <span className="invite-success-name">
                {inviteFirstName} {inviteLastName}
              </span>
              . They should be receiving a personal link to create an account in
              no more than 5 minutes.
            </div>
            <buton
              className="invite-success-button"
              onClick={() => this.handleCloseModal('success')}
            >
              Okay
            </buton>
          </div>
        </Modal>
        {/* Modal for admin card */}
        {displayAdminInfo ? (
          <Modal
            isOpen={showAdminModal}
            onRequestClose={() => this.handleCloseModal('admin')}
            className="admin-contact-modal"
            overlayClassName="admin-modal-overlay"
          >
            <div className="">
              <div className="admin-contact-container-top">
                <h2 className="admin-contact-name">{displayAdminInfo.name}</h2>
                <div className="admin-contact-types">
                  {displayAdminInfo.ownerTypes.map((type, index) => (
                    <div className="">
                      {type === 'General' ? 'General Owner' : type}
                      {index === displayAdminInfo.ownerTypes.length - 1
                        ? null
                        : ',\xa0'}
                    </div>
                  ))}
                </div>
              </div>
              <div className="admin-contact-container-bottom">
                <div className="admin-contact-header">
                  <div className="admin-contact-contact-info">
                    Contact Information
                  </div>
                  {!adminEditMode ? (
                    <button
                      type="button"
                      className="admin-contact-edit-btn"
                      onClick={() => this.handleContactEdit('edit')}
                    >
                      Edit
                    </button>
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="admin-contact-cancel-btn"
                        onClick={() => this.handleContactEdit('cancel')}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="admin-contact-save-btn"
                        onClick={() => this.handleContactEdit('save')}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
                <div className="admin-contact-bottom-container">
                  <div className="admin-contact-field">
                    <div className="admin-contact-field-name">Email</div>
                    <div className="admin-contact-field-name">Phone</div>
                    <div className="admin-contact-field-name">Address</div>
                  </div>
                  {!adminEditMode ? (
                    <div className="admin-contact-info">
                      <div className="admin-contact-field-info">
                        {displayAdminInfo.email}
                      </div>
                      <div className="admin-contact-field-info">
                        {displayAdminInfo.phoneNumber}
                      </div>
                      <div className="admin-contact-field-info">
                        {displayAdminInfo.permanentAddress.substring(
                          0,
                          displayAdminInfo.permanentAddress.indexOf(',')
                        )}
                        <br />
                        {displayAdminInfo.permanentAddress.substring(
                          displayAdminInfo.permanentAddress.indexOf(',') + 1
                        )}
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={this.handleSubmit}>
                      <label>
                        <input
                          type="text"
                          name="updatedEmail"
                          placeholder={updatedEmail}
                          className="admin-contact-info-input"
                          value={updatedEmail}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label>
                        <input
                          type="text"
                          name="updatedPhoneNumber"
                          placeholder={updatedPhoneNumber}
                          className="admin-contact-info-input"
                          value={updatedPhoneNumber}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label>
                        <input
                          type="text"
                          name="updatedAddress"
                          placeholder={updatedAddress}
                          className="admin-contact-info-input"
                          value={updatedAddress}
                          onChange={this.handleChange}
                        />
                      </label>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  credentials: state.userData.credentials,
  userLogin: state.userData.userLogin,
  projectGroup: state.userData.projectGroup
});

export default connect(mapStateToProps)(AdminDashboard);
