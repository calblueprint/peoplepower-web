/* eslint react/destructuring-assignment: 0 */

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
import { isSuperAdmin, getCredentials } from '../../lib/credentials';
import Success from '../../assets/success.png';
import { updateOwner } from '../../lib/airtable/request';
import LoadingComponent from '../../components/LoadingComponent';

const SENDING_STATUS = 'Sending';
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
      updatedStreet1: '',
      updatedStreet2: '',
      updatedCity: '',
      updatedState: '',
      updatedZipcode: '',
      errors: {},
      loading: true
    };
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
      updatedStreet1: owner.permanentStreet1,
      updatedStreet2: owner.permanentStreet2,
      updatedCity: owner.permanentCity,
      updatedState: owner.permanentState,
      updatedZipcode: owner.permanentZipcode,
      showAdminModal: !displayAdmin
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

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
      projectGroupId: projectGroup.id,
      status: 'Sent'
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
      this.setState({
        status: SENDING_STATUS,
        showModal: false,
        showSuccessModal: true
      });
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
          status: emailStatus
        });
      }
    }
  };

  validateContactAndSubmitData = async () => {
    const {
      updatedEmail,
      updatedPhoneNumber,
      updatedStreet1,
      updatedStreet2,
      updatedCity,
      updatedState,
      updatedZipcode,
      displayAdminInfo
    } = this.state;
    const newOwner = {
      phoneNumber: updatedPhoneNumber,
      email: updatedEmail,
      permanentStreet1: updatedStreet1,
      permanentStreet2: updatedStreet2,
      permanentCity: updatedCity,
      permanentState: updatedState,
      permanentZipcode: updatedZipcode
    };
    const errors = {};
    let foundErrors = false;
    const fields = [
      'updatedEmail',
      'updatedPhoneNumber',
      'updatedStreet1',
      'updatedCity',
      'updatedState',
      'updatedZipcode'
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
      await updateOwner(displayAdminInfo.id, newOwner);
      this.setState({ adminEditMode: false });
    }
  };

  fetchOwnerRecords = async () => {
    const { projectGroup } = this.props;
    const ownerRecords = await getOwnerRecordsForProjectGroup(projectGroup);
    this.setState({
      owners: ownerRecords,
      loading: false
    });
  };

  /* open/close modal logic */
  handleOpenModal = modal => {
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
  };

  handleCloseModal = modal => {
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
  };

  handleContactEdit = type => {
    switch (type) {
      case 'edit':
        this.setState({ adminEditMode: true });
        break;
      case 'cancel':
        this.setState({ adminEditMode: false });
        break;
      case 'save':
        this.validateContactAndSubmitData();
        break;
      default:
        break;
    }
  };

  render() {
    const { owner, projectGroup } = this.props;
    const credentials = getCredentials(owner);
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
      updatedStreet1,
      updatedStreet2,
      updatedCity,
      updatedState,
      updatedZipcode,
      errors,
      status,
      loading
    } = this.state;

    if (loading) {
      return <LoadingComponent />;
    }

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
                owners.map(o => {
                  return (
                    <AdminDashboardCard
                      key={o.id}
                      owner={o}
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
                  <div className="admin-flex-col">
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
                        placeholder="First Name"
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
                  <div className="admin-flex-col">
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
                        placeholder="Last Name"
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
                  <div className="admin-flex-col">
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
                        placeholder="510-416-7890"
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
                  <div className="admin-flex-col">
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
                        placeholder="email@gmail.com"
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
                  <div className="admin-flex-col">
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
          {/* eslint-disable-next-line no-nested-ternary */}
          {status === SENDING_STATUS ? (
            <div>
              <LoadingComponent />
            </div>
          ) : status.startsWith('Successfully') ? (
            <div className="invite-success-container">
              <img
                src={Success}
                alt="success"
                className="invite-success-icon"
              />
              <h2 className="invite-success-title">
                Your invitation is on it&apos;s away!
              </h2>
              <div className="invite-success-description">
                We’ve sent your invitation to{' '}
                <span className="invite-success-name">
                  {inviteFirstName} {inviteLastName}
                </span>
                . They should be receiving a personal link to create an account
                in no more than 5 minutes.
              </div>
              <button
                type="button"
                className="invite-success-button"
                onClick={() => this.handleCloseModal('success')}
              >
                Okay
              </button>
            </div>
          ) : (
            <div className="invite-success-container">
              <h2 className="invite-success-title">
                There was an error with the invite. Please retry.
              </h2>
            </div>
          )}
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
                    <div
                      className={`admin-contact-field-name 
                    ${adminEditMode ? 'paddingtop-1' : null}`}
                    >
                      Email
                    </div>
                    <div
                      className={`admin-contact-field-name 
                    ${adminEditMode ? 'paddingtop-1' : null}`}
                    >
                      Phone
                    </div>
                    <div
                      className={`admin-contact-field-name 
                    ${adminEditMode ? 'paddingtop-1' : null}`}
                    >
                      Address
                    </div>
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
                          className={`admin-contact-info-input marginbottom-1 width-85 
                          ${toggleValidColor(errors.updatedEmail, 2)}`}
                          value={updatedEmail}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label>
                        <input
                          type="text"
                          name="updatedPhoneNumber"
                          placeholder={updatedPhoneNumber}
                          className={`admin-contact-info-input marginbottom-1 width-85 
                          ${toggleValidColor(errors.updatedPhoneNumber, 2)}`}
                          value={updatedPhoneNumber}
                          onChange={this.handleChange}
                        />
                      </label>
                      <div className="flex admin-card-address-input justify-content-space">
                        <div className="w-80 mr-1">
                          <input
                            name="updatedStreet1"
                            placeholder="Street 1"
                            onChange={this.handleChange}
                            defaultValue={updatedStreet1}
                            className={`admin-contact-info-input ${toggleValidColor(
                              errors.updatedStreet1,
                              2
                            )}`}
                          />
                        </div>
                        <div className="w-20 ">
                          <input
                            name="updatedStreet2"
                            placeholder="Street 2"
                            onChange={this.handleChange}
                            defaultValue={updatedStreet2}
                            className={`admin-contact-info-input ${toggleValidColor(
                              errors.updatedStreet2,
                              2
                            )}`}
                          />
                        </div>
                      </div>
                      <div className="flex admin-card-address-input justify-content-space">
                        <div className="w-80 validation">
                          {toggleValidColor(errors.updatedStreet1, 1)}
                        </div>

                        <div className="w-20 validation">
                          {toggleValidColor(errors.updatedStreet1, 1)}
                        </div>
                      </div>
                      <div className="flex admin-card-address-input justify-content-space">
                        <div className="w-40">
                          <input
                            name="updatedCity"
                            placeholder="City"
                            onChange={this.handleChange}
                            defaultValue={updatedCity}
                            className={`admin-contact-info-input ${toggleValidColor(
                              errors.updatedCity,
                              2
                            )}`}
                          />
                        </div>
                        <div className="w-15 ">
                          <input
                            name="updatedState"
                            placeholder="State"
                            onChange={this.handleChange}
                            defaultValue={updatedState}
                            className={`admin-contact-info-input ${toggleValidColor(
                              errors.updatedState,
                              2
                            )}`}
                          />
                        </div>
                        <div className="w-25">
                          <input
                            name="updatedZipcode"
                            placeholder="Zipcode"
                            onChange={this.handleChange}
                            defaultValue={updatedZipcode}
                            className={`admin-contact-info-input ${toggleValidColor(
                              errors.updatedZipcode,
                              2
                            )}`}
                          />
                        </div>
                      </div>
                      <div className="flex admin-card-address-input justify-content-space">
                        <div className="w-40 pr-1 validation">
                          {toggleValidColor(errors.updatedCity, 1)}
                        </div>
                        <div className="w-15 validation">
                          {toggleValidColor(errors.updatedState, 1)}
                        </div>
                        <div className="w-25 validation">
                          {toggleValidColor(errors.updatedZipcode, 1)}
                        </div>
                      </div>
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
  userLogin: state.userData.userLogin,
  projectGroup: state.userData.projectGroup
});

export default connect(mapStateToProps)(AdminDashboard);
