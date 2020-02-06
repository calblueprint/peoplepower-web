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
      id: '',
      email: '',
      name: 'user',
      phoneNumber: '',
      projectGroup: '',
      status: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      updateName: '',
      updateEmail: '',
      updatePhone: '',
      userLoginID: '',
      updateStreet: '',
      updateCity: '',
      updateState: '',
      updateZip: '',
      isLoading: true
    };
  }

  async componentDidMount() {
    // TODO: Don't take ID from url, take it from redux

    const { owner, projectGroup, isLoadingUserData } = this.props;

    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    // TODO: We don't need to pull all of this data from props just to put it into state.
    // We can be smarter about it
    const {
      id,
      email,
      phoneNumber,
      name,
      userLogin: userLoginID,
      city,
      street,
      state,
      zipcode: zipCode
    } = owner;

    const { name: projectGroupName } = projectGroup;
    this.setState({
      id,
      email,
      updateEmail: email,
      name,
      updateName: name,
      phoneNumber,
      updatePhone: phoneNumber,
      userLoginID: userLoginID[0],
      street,
      updateStreet: street,
      city,
      updateCity: city,
      state,
      updateState: state,
      zipcode: zipCode,
      updateZip: zipCode,
      projectGroup: projectGroupName,
      isLoading: false
    });
  }

  handleChange = event => {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {
      id,
      updateName,
      updateEmail,
      updatePhone,
      userLoginID,
      updateStreet,
      updateCity,
      updateState,
      updateZip
    } = this.state;

    /* TODO:
      1. implement change password
      2. form validation
    */

    const newPerson = {
      name: updateName,
      email: updateEmail.toLowerCase(),
      phoneNumber: updatePhone,
      street: updateStreet,
      city: updateCity,
      state: updateState.toUpperCase(),
      zipcode: updateZip
    };
    const newLogin = {
      email: updateEmail
    };
    // console.log(`UPDATE: ${userLoginID}`);
    await updatePerson(id, newPerson);
    this.setState({
      status: STATUS_IN_PROGRESS
    });
    const result = await updateUserLogin(userLoginID, newLogin);

    if (result === '') {
      this.setState({
        status: STATUS_ERR
      });
    } else {
      this.setState({
        status: STATUS_SUCCESS,
        name: updateName,
        email: updateEmail,
        street: updateStreet,
        city: updateCity,
        state: updateState,
        zipcode: updateZip
      });
    }

    // get latest copy of user login record
    const userLogin = await getUserLoginById(userLoginID);

    // Refresh local cache with latest user data
    await refreshUserData(userLogin);
  };

  render() {
    const {
      name,
      email,
      phoneNumber,
      projectGroup,
      street,
      city,
      state,
      zipcode,
      newName,
      newEmail,
      newPhone,
      newStreet,
      newCity,
      newState,
      newZip,
      newPass,
      status,
      isLoading
    } = this.state;

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
              <h3>{name}</h3>
              <h4>General Owner</h4>
            </div>
            <div className="general-form">
              <h2>General</h2>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <p>
                    <label htmlFor="updateName">
                      Name
                      <input
                        type="text"
                        name="updateName"
                        placeholder={name}
                        value={newName}
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
                        placeholder={email}
                        name="updateEmail"
                        value={newEmail}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updatePass">
                      Password
                      <input
                        type="text"
                        name="updatePass"
                        placeholder="••••••••"
                        value={newPass}
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
                        placeholder={projectGroup}
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
                        placeholder={phoneNumber}
                        value={newPhone}
                        onChange={this.handleChange}
                      />
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateStreet">
                      Street:
                      <input
                        type="text"
                        name="updateStreet"
                        placeholder={street}
                        value={newStreet}
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
                        placeholder={city}
                        value={newCity}
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
                        placeholder={state}
                        value={newState}
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
                        placeholder={zipcode}
                        value={newZip}
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
  person: state.userData.person,
  owner: state.userData.owner,
  projectGroup: state.userData.projectGroup,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(UserProfile);
