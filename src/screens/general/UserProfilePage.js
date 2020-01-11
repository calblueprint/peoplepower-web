// SEE TODOS ON LINE ~131.

import React from 'react';
import '../../styles/UserProfilePage.css';
import {
  getPersonById,
  getOwnerById,
  getProjectGroupById,
  updatePerson,
  updateUserLogin
} from '../../lib/request';
import LoadingComponent from '../../components/LoadingComponent';

const STATUS_ERR = -1;
const STATUS_IN_PROGRESS = 0;
const STATUS_SUCCESS = 1;

export default class UserProfilePage extends React.Component {
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
    // id taken from URL. React Router's useParams() threw an "invalid hook" error.
    const { match } = this.props;
    const { id } = match.params;
    const personRecord = await getPersonById(id);
    const {
      Email: email,
      'Phone Number': phoneNumber,
      Owner: ownerId,
      Name: name,
      'User Login': userLoginID,
      City: city,
      Street: street,
      State: state,
      Zipcode: zipCode
    } = personRecord;

    const ownerRecord = await getOwnerById(ownerId);
    const { 'Project Group': projectGroupID } = ownerRecord;
    const projectRecord = await getProjectGroupById(projectGroupID);
    const { Name: projectGroupName } = projectRecord;
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
      Name: updateName,
      Email: updateEmail.toLowerCase(),
      'Phone Number': updatePhone,
      Street: updateStreet,
      City: updateCity,
      State: updateState.toUpperCase(),
      Zipcode: updateZip
    };
    const newLogin = {
      Email: updateEmail
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
            <div className="userIcon">
              <h3>{name}</h3>
              <h4>General Owner</h4>
            </div>
            <div className="generalForm">
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
                      border: '1px solid black',
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
            <div className="contactInfoForm">
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
                      border: '1px solid black',
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
