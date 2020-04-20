import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminDashboardCard from './components/AdminDashboardCard';
import {
  getOwnerRecordsForProjectGroup,
  inviteMember,
  triggerEmail
} from '../../lib/adminUtils';
import '../../styles/main.css';
import '../../styles/AdminDashboard.css';
import { isSuperAdmin } from '../../lib/credentials';
import Success from '../../assets/success.png';

const ROOT_ELEMENT = '#root';
Modal.setAppElement(ROOT_ELEMENT);

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminEditMode: true,
      owners: [],
      showModal: false,
      showSuccessModal: false,
      showAdminModal: false,
      inviteFirstName: '',
      inviteLastName: '',
      invitePhoneNumber: '',
      inviteEmail: '',
      inviteShareAmount: 0,
      inviteWantsDividends: true,
      status: '',
      displayAdminInfo: {
        projectGroupId: 'recYjX74bkem102B7',
        ownerTypes: ['General', 'Admin'],
        adminOfId: 'recYjX74bkem102B7',
        numberOfShares: 10,
        isReceivingDividends: true,
        firstName: 'Grayson',
        lastName: 'Flood',
        email: 'grayson@gmail.com',
        permanentStreet1: '12345 Easy St.',
        permanentCity: 'Oakland',
        permanentState: 'CA',
        permanentZipcode: '12345',
        mailingStreet1: '12345 Easy St.',
        mailingCity: 'Oakland',
        mailingState: 'CA',
        mailingZipcode: '12345',
        phoneNumber: '(123) 456-7890',
        onboardingStep: -1,
        password: 'password',
        announcementIds: ['recLWbCW4kiNDsMGk'],
        mailingAddressSame: true,
        bylaw1: true,
        bylaw2: true,
        certifyPermanentAddress: true,
        isSuperAdmin: true,
        primaryKey: 'Grayson Flood',
        dateCreated: '2020-03-04T01:26:54.000Z',
        dateUpdated: '2020-04-17T08:20:11.000Z',
        id: 'reccQyo8gOMkbDRta',
        name: 'Grayson Flood',
        permanentAddress: '12345 Easy St., Oakland, CA, 12345',
        mailingAddress: '12345 Easy St., Oakland, CA, 12345',
        latestBillNumber: 0
      }
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
      inviteShareAmount,
      inviteWantsDividends
    } = this.state;

    const { projectGroup } = this.props;

    const newPledgeInvite = {
      firstName: inviteFirstName,
      lastName: inviteLastName,
      phoneNumber: invitePhoneNumber,
      email: inviteEmail,
      shareAmount: parseInt(inviteShareAmount, 10),
      wantsDividends: JSON.parse(inviteWantsDividends),
      projectGroupId: projectGroup.id
    };

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
      case 'submit':
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
      adminEditMode
    } = this.state;

    return (
      <div className="dashboard dash-admin">
        <div className="container">
          <div className="flex justify-content-space pb-5">
            <h3 className="admin-project-group">Berkeley Cooperative Power</h3>
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
          onRequestClose={() => this.handleCloseModal('success')}
          className="admin-modal"
          overlayClassName="admin-modal-overlay"
        >
          <h3>Invite a Member to {projectGroup.name}</h3>
          <div className="admin-invite-form">
            <form onSubmit={this.handleSubmit}>
              <div className="admin-invite-form-row">
                <div className="">
                  <p>
                    <label htmlFor="inviteFirstName">
                      <p className="admin-invite-form-label-wrapper">
                        First name{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </p>
                      <input
                        type="text"
                        name="inviteFirstName"
                        placeholder="Aivant"
                        className="admin-invite-form-input"
                        value={inviteFirstName}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div className="">
                  <p>
                    <label htmlFor="inviteLastName">
                      <p className="admin-invite-form-label-wrapper">
                        Last name{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </p>
                      <input
                        type="text"
                        name="inviteLastName"
                        placeholder="Goyal"
                        className="admin-invite-form-input"
                        value={inviteLastName}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
              </div>
              <div className="admin-invite-form-row">
                <div className="">
                  <p>
                    <label htmlFor="invitePhoneNumber">
                      <p className="admin-invite-form-label-wrapper">
                        Phone number{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </p>
                      <input
                        type="text"
                        name="invitePhoneNumber"
                        placeholder="123-456-7890"
                        className="admin-invite-form-input"
                        value={invitePhoneNumber}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div className="">
                  <p>
                    <label htmlFor="inviteEmail">
                      <p className="admin-invite-form-label-wrapper">
                        Email{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </p>
                      <input
                        type="text"
                        name="inviteEmail"
                        placeholder="invitees_email@gmail.com"
                        className="admin-invite-form-input"
                        value={inviteEmail}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
              </div>
              <div className="admin-invite-form-row">
                <div className="">
                  <p>
                    <label htmlFor="inviteShareAmount">
                      Number of shares
                      <input
                        type="text"
                        name="inviteShareAmount"
                        placeholder="Number between $0 to $1000"
                        className="admin-invite-form-input"
                        value={inviteShareAmount}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
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
                    <div className="">{displayAdminInfo.email}</div>
                    <div className="">{displayAdminInfo.phoneNumber}</div>
                    <div className="">
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
                        name="email"
                        placeholder={displayAdminInfo.email}
                        className="admin-contact-info-input"
                        value={displayAdminInfo.email}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label>
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder={displayAdminInfo.phoneNumber}
                        className="admin-contact-info-input"
                        value={displayAdminInfo.phoneNumber}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label>
                      <input
                        type="text"
                        name="permanentAddresss"
                        placeholder={displayAdminInfo.permanentAddress}
                        className="admin-contact-info-input"
                        value={displayAdminInfo.permanentAddress}
                        onChange={this.handleChange}
                      />
                    </label>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Modal>
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
