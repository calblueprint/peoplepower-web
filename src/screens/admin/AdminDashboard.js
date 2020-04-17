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
      owners: [],
      showModal: false,
      showSuccessModal: false,
      inviteFirstName: '',
      inviteLastName: '',
      invitePhoneNumber: '',
      inviteEmail: '',
      inviteShareAmount: 0,
      inviteWantsDividends: true,
      status: ''
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  /* form logic */
  handleChange = event => {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
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
    if (modal === 'invite') {
      this.setState({ showModal: true });
    } else {
      this.setState({ showSuccessModal: true });
    }
  }

  handleCloseModal(modal) {
    if (modal === 'invite') {
      this.setState({ showModal: false });
    } else {
      this.setState({ showSuccessModal: false });
    }
  }

  render() {
    const { credentials, projectGroup } = this.props;
    const {
      showModal,
      showSuccessModal,
      owners,
      inviteFirstName,
      inviteLastName,
      invitePhoneNumber,
      inviteEmail,
      inviteShareAmount,
      status
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
                  return <AdminDashboardCard key={owner.id} owner={owner} />;
                })
              ) : (
                <div className="white-text">
                  No owners to be displayed in this project group
                </div>
              )}
            </div>
          </div>
        </div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
                  <input
                    type="submit"
                    value="Send Invite"
                    className="admin-invite-form-submit"
                  />
                </div>
                <h4 className="status-text">{status}</h4>
              </div>
            </form>
          </div>
        </Modal>
        {/* {!status ?  */}
        <Modal
          isOpen={showSuccessModal}
          contentLabel="onRequestClose Example"
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
        {/* : null */}
        {/* } */}
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
