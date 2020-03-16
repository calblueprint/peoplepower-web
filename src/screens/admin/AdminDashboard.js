import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminDashboardCard from './components/AdminDashboardCard';
import LoadingComponent from '../../components/LoadingComponent';
import {
  getOwnerRecordsForProjectGroup,
  inviteMember,
  triggerEmail
} from '../../lib/adminUtils';
import '../../styles/main.css';
import '../../styles/AdminDashboard.css';
import { isSuperAdmin } from '../../lib/credentials';

const ROOT_ELEMENT = '#root';
Modal.setAppElement(ROOT_ELEMENT);

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      showModal: false,
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
      projectGroupId: [projectGroup.id]
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
        showModal: false
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
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { isLoadingUserData, credentials, projectGroup } = this.props;
    const {
      showModal,
      owners,
      inviteFirstName,
      inviteLastName,
      invitePhoneNumber,
      inviteEmail,
      inviteShareAmount,
      inviteWantsDividends,
      status
    } = this.state;

    if (isLoadingUserData) {
      return <LoadingComponent />;
    }

    return (
      <div className="dashboard dash-admin">
        <div>
          <h3>Project Group</h3>
          <div className="card-holder-cont">
            {isSuperAdmin(credentials) && (
              <Link to="/superadmin">Super Admin Dashboard</Link>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>
                Members <span>({owners.length})</span>
              </h4>
              <button
                type="button"
                className="btn btn--square btn--pink btn--size16 btn--weight600 invite-button"
                onClick={this.handleOpenModal}
              >
                Invite
              </button>
            </div>
            <div className="card-holder">
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
          onRequestClose={this.handleCloseModal}
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
                      <select
                        name="inviteShareAmount"
                        value={inviteShareAmount}
                        onChange={this.handleChange}
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="inviteWantsDividends">
                      Wants Dividends
                      <select
                        name="inviteWantsDividends"
                        value={inviteWantsDividends}
                        onChange={this.handleChange}
                      >
                        <option value>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </label>
                  </p>
                </div>
              </div>
              <div className="admin-invite-form-row">
                <div>
                  <p>Project Group</p>
                  <p className="admin-project-group">{projectGroup.name}</p>
                </div>
              </div>
              <div className="admin-invite-form-row admin-invite-form-row-submit">
                <div>
                  <input
                    type="submit"
                    value="Submit"
                    className="admin-invite-form-submit"
                  />
                </div>
                <h4 className="status-text">{status}</h4>
              </div>
            </form>
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
  projectGroup: state.userData.projectGroup,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(AdminDashboard);
