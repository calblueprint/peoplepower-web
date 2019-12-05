// SEE TODOS ON LINE ~131.

import React from 'react';
import '../../styles/UserProfilePage.css';
import { getRecord, updatePerson, updateRecord } from '../../lib/request';

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // id taken from URL. React Router's useParams() threw an "invalid hook" error.
    const { match } = this.props;
    const { id } = match.params;
    this.setState({
      id
    });

    let email;
    let phoneNumber;
    let name;
    let owner;
    let city;
    let street;
    let state;
    let zipCode;
    let userLoginID;

    getRecord('Person', id)
      .then(payload => {
        ({
          Email: email,
          'Phone Number': phoneNumber,
          Owner: owner,
          Name: name,
          'User Login': userLoginID,
          City: city,
          Street: street,
          State: state,
          Zipcode: zipCode
        } = payload.record);
        this.setState({
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
          updateZip: zipCode
        });

        // Getting project group
        return getRecord('Owner', owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroupID } = payload.record;

        return getRecord('Project Group', projectGroupID);
      })
      .then(payload => {
        const { Name: projectGroupName } = payload.record;
        this.setState({
          projectGroup: projectGroupName,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(event) {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
    });
  }

  handleSubmit(event) {
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
      id,
      fields: {
        Name: updateName,
        Email: updateEmail.toLowerCase(),
        'Phone Number': updatePhone,
        Street: updateStreet,
        City: updateCity,
        State: updateState.toUpperCase(),
        Zipcode: updateZip
      }
    };
    const newLogin = {
      id: userLoginID,
      fields: {
        Email: updateEmail
      }
    };
    // console.log(`UPDATE: ${userLoginID}`);
    updatePerson(newPerson)
      .then(() => {
        this.setState({
          status: STATUS_IN_PROGRESS,
          name: updateName,
          email: updateEmail,
          street: updateStreet,
          city: updateCity,
          state: updateState,
          zipcode: updateZip
        });
        return updateRecord('User Login', newLogin);
      })
      .then(payload => {
        console.log(payload === '');
        if (payload === '') {
          this.setState({
            status: STATUS_ERR,
            name: updateName,
            email: updateEmail,
            street: updateStreet,
            city: updateCity,
            state: updateState,
            zipcode: updateZip
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
      });
  }

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
      <p>spinner</p>
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
