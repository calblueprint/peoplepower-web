import React from 'react';
import { connect } from 'react-redux';
import { updateOwner } from '../../lib/airtable/request';
import LoadingComponent from '../../components/LoadingComponent';
import { refreshUserData } from '../../lib/userDataUtils';
import '../../styles/UserProfilePage.css';

const STATUS_ERR = -1;
const STATUS_IN_PROGRESS = 0;
const STATUS_SUCCESS = 1;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFirstName: '',
      updateLastName: '',
      updateEmail: '',
      updatePhoneNumber: '',
      updateStreet1: '',
      updateStreet2: '',
      updateCity: '',
      updateState: '',
      updateZipcode: '',
      status: '',
      isLoading: true
    };
  }

  componentDidMount() {
    this.pullPropsIntoState();
  }

  componentDidUpdate(prevProps) {
    const { owner } = this.props;
    if (owner !== prevProps.owner) {
      this.pullPropsIntoState();
    }
  }

  pullPropsIntoState = () => {
    const { owner, isLoadingUserData } = this.props;

    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    this.setState({
      updateFirstName: owner.firstName,
      updateLastName: owner.lastName,
      updateEmail: owner.email,
      updatePhoneNumber: owner.phoneNumber,
      updateStreet1: owner.permanentStreet1,
      updateStreet2: owner.permanentStreet2,
      updateCity: owner.permanentCity,
      updateState: owner.permanentState,
      updateZipcode: owner.permanentZipcode
    });
  };

  handleChange = event => {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {
      updateFirstName,
      updateLastName,
      updateEmail,
      updatePhoneNumber,
      updateStreet1,
      updateStreet2,
      updateCity,
      updateState,
      updateZipcode
    } = this.state;

    const { owner } = this.props;

    /* TODO:
      1. implement change password
      2. form validation
    */

    const newOwner = {
      lastName: updateLastName,
      firstName: updateFirstName,
      email: updateEmail.toLowerCase(),
      phoneNumber: updatePhoneNumber,
      permanentStreet1: updateStreet1,
      permanentStreet2: updateStreet2,
      city: updateCity,
      state: updateState.toUpperCase(),
      zipcode: updateZipcode
    };

    const result = await updateOwner(owner.id, newOwner);

    if (result === '') {
      this.setState({
        status: STATUS_ERR
      });
    } else {
      // Refresh local cache with latest user data
      await refreshUserData(owner);
      this.setState({
        status: STATUS_SUCCESS
      });
    }
  };

  render() {
    const {
      updateFirstName,
      updateLastName,
      updateEmail,
      updatePhoneNumber,
      updateStreet1,
      updateStreet2,
      updateCity,
      updateState,
      updateZipcode,
      status,
      isLoading
    } = this.state;

    const { projectGroup } = this.props;

    let formStatus = '';

    switch (status) {
      case STATUS_ERR:
        formStatus = 'form-fail';
        break;
      case STATUS_IN_PROGRESS:
        formStatus = '';
        break;
      case STATUS_SUCCESS:
        formStatus = 'form-success';
        break;
      default:
        break;
    }

    return isLoading ? (
      <LoadingComponent />
    ) : (
      <div className="dashboard settings">
        <div className="cont">
          <h2>Settings</h2>
          <div className="row">
            <div className="user-icon">
              <h3>{`${updateFirstName} ${updateLastName}`}</h3>
              <h4>General Owner</h4>
            </div>
            <div className="general-form">
              <h2>General</h2>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <p>
                    <label htmlFor="updateFirstName">
                      First Name
                      <input
                        type="text"
                        name="updateFirstName"
                        placeholder={updateFirstName}
                        value={updateFirstName}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateEmail">
                      Email
                      <input
                        type="text"
                        placeholder={updateEmail}
                        name="updateEmail"
                        value={updateEmail}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>

                <div>
                  <p className="pg">
                    <label htmlFor="updatePG">
                      Project Group
                      <input
                        type="text"
                        name="updatePG"
                        placeholder={projectGroup.name}
                        disabled
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
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
                    className={formStatus}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="contact-info-form">
              <h2>Contact Information</h2>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <p>
                    <label htmlFor="updatePhone">
                      Phone Number:
                      <input
                        type="text"
                        name="updatePhone"
                        placeholder={updatePhoneNumber}
                        value={updatePhoneNumber}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateStreet1">
                      Street:
                      <input
                        type="text"
                        name="updateStreet1"
                        placeholder={updateStreet1}
                        value={updateStreet1}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateStreet2">
                      Street:
                      <input
                        type="text"
                        name="updateStreet2"
                        placeholder={updateStreet2}
                        value={updateStreet2}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateCity">
                      City:
                      <input
                        type="text"
                        name="updateCity"
                        placeholder={updateCity}
                        value={updateCity}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateState">
                      State:
                      <input
                        type="text"
                        name="updateState"
                        placeholder={updateState}
                        value={updateState}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateZip">
                      Zip Code:
                      <input
                        type="text"
                        name="updateZip"
                        placeholder={updateZipcode}
                        value={updateZipcode}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
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
                    className={formStatus}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  projectGroup: state.userData.projectGroup,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(UserProfile);
