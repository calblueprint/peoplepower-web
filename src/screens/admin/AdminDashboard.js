import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminDashboardCard from './components/AdminDashboardCard';
import LoadingComponent from '../../components/LoadingComponent';
import {
  getOwnerRecordsForProjectGroup,
  inviteMember
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

    const recordStatus = await inviteMember(newPledgeInvite);

    if (recordStatus === '') {
      this.setState({
        status: 'An error occurent when sending the invitation.'
      });
    } else {
      this.setState({
        status: 'Successfully sent invitation.'
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
          <h3>Invite a PP Person </h3>
          <div className="admin-invite-form">
            <form onSubmit={this.handleSubmit}>
              <div className="admin-invite-form-row">
                <div>
                  <p>
                    <label
                      htmlFor="inviteFirstName"
                      style={{ paddingRight: '6.5px' }}
                    >
                      First name
                      <input
                        type="text"
                        name="inviteFirstName"
                        placeholder="Aivant"
                        value={inviteFirstName}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label
                      htmlFor="inviteLastName"
                      style={{ paddingLeft: '6.5px' }}
                    >
                      Last name
                      <input
                        type="text"
                        name="inviteLastName"
                        placeholder="Goyal"
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
                    <label
                      htmlFor="invitePhoneNumber"
                      style={{ paddingRight: '6.5px' }}
                    >
                      Phone number
                      <input
                        type="text"
                        name="invitePhoneNumber"
                        placeholder="123-456-7890"
                        value={invitePhoneNumber}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label
                      htmlFor="inviteEmail"
                      style={{ paddingLeft: '6.5px' }}
                    >
                      Email
                      <input
                        type="text"
                        name="inviteEmail"
                        placeholder="invitees_email@gmail.com"
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
                    <label
                      htmlFor="inviteShareAmount"
                      style={{ paddingRight: '6.5px' }}
                    >
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
                    <label
                      htmlFor="inviteWantsDividends"
                      style={{ paddingLeft: '6.5px' }}
                    >
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
                  <p>{projectGroup.name}</p>
                </div>
              </div>
              <div
                className="admin-invite-form-row"
                style={{ flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ margin: 'auto' }}>
                  <input
                    type="submit"
                    value="Submit"
                    style={{
                      border: '1px solid var(--pp-black)',
                      float: 'left',
                      padding: '5px 10px',
                      width: '100px'
                    }}
                  />
                </div>
                <p>{status}</p>
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
