import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import AdminDashboardCard from './components/AdminDashboardCard';
import LoadingComponent from '../../components/LoadingComponent';
import { getOwnerRecordsForProjectGroup } from '../../lib/adminUtils';
import '../../styles/main.css';
import '../../styles/AdminDashboard.css';

const ROOT_ELEMENT = '#root';
Modal.setAppElement(ROOT_ELEMENT);

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      showModal: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
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
    const { firstName, lastName, phone, email } = this.state;

    console.log(firstName, lastName, phone, email);
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
    const { isLoadingUserData } = this.props;
    const { showModal, owners, firstName, lastName, phone, email } = this.state;

    if (isLoadingUserData) {
      return <LoadingComponent />;
    }

    return (
      <div className="dashboard dash-admin">
        <div>
          <h3>Project Group</h3>
          <div className="card-holder-cont">
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
                      htmlFor="firstName"
                      style={{ paddingRight: '6.5px' }}
                    >
                      First Name
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name:"
                        value={firstName}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="lastName" style={{ paddingLeft: '6.5px' }}>
                      Last Name
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name:"
                        value={lastName}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
              </div>
              <div className="admin-invite-form-row">
                <div>
                  <p>
                    <label htmlFor="phone" style={{ paddingRight: '6.5px' }}>
                      Phone
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number:"
                        value={phone}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="email" style={{ paddingLeft: '6.5px' }}>
                      Email
                      <input
                        type="text"
                        name="email"
                        placeholder="Email:"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
              </div>
              <div>
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
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  userLogin: state.userData.userLogin,
  projectGroup: state.userData.projectGroup,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(AdminDashboard);
