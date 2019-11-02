import React from 'react';
import '../../styles/UserProfilePage.css';
import { getRecord, updatePerson, updateRecord } from '../../lib/request';

export default class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      name: 'user',
      phoneNumber: '',
      address: '',
      addressID: '',
      projectGroup: '',
      status: '',
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
    let addressID;
    let userLoginID;

    getRecord('Person', id)
      .then(payload => {
        ({
          Email: email,
          'Phone Number': phoneNumber,
          Owner: owner,
          Address: addressID,
          Name: name,
          'User Login': userLoginID,
          Address: addressID
        } = payload.record);
        this.setState({
          email,
          updateEmail: email,
          name,
          updateName: name,
          phoneNumber,
          updatePhone: phoneNumber,
          userLoginID: userLoginID[0],
          addressID: addressID[0]
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
          projectGroup: projectGroupName
        });

        // Getting Address
        return getRecord('Address', addressID);
      })
      .then(payload => {
        const {
          City: city,
          Street: street,
          State: state,
          'Zip Code': zipCode
        } = payload.record;

        this.setState({
          address: `${street}, ${city}, ${state} ${zipCode}`,
          updateStreet: street,
          updateCity: city,
          updateState: state,
          updateZip: zipCode,
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
      addressID,
      updateStreet,
      updateCity,
      updateState,
      updateZip
    } = this.state;

    const newPerson = {
      id,
      fields: {
        Name: updateName,
        Email: updateEmail.toLowerCase(),
        'Phone Number': updatePhone
      }
    };
    const newLogin = {
      id: userLoginID,
      fields: {
        Email: updateEmail
      }
    };
    const newAddress = {
      id: addressID,
      fields: {
        Street: updateStreet,
        City: updateCity,
        State: updateState.toUpperCase(),
        'Zip Code': updateZip
      }
    };
    console.log(`UPDATE: ${userLoginID}`);
    // note there should be an function that I write that just does this rerendering
    updatePerson(newPerson)
      .then(payload => {
        this.setState({
          status: payload.status,
          name: updateName,
          email: updateEmail
        });
        return updateRecord('User Login', newLogin);
      })
      .then(payload => {
        this.setState({
          status: payload.status,
          name: updateName,
          email: updateEmail
        });
        return updateRecord('Address', newAddress);
      })
      .then(() => {
        this.setState({
          address: `${updateStreet}, ${updateCity}, ${updateState} ${updateZip}`
        });
      });
  }

  render() {
    const {
      name,
      email,
      phoneNumber,
      address,
      projectGroup,
      newName,
      newEmail,
      newPhone,
      newStreet,
      newCity,
      newState,
      newZip,
      status,
      isLoading
    } = this.state;
    return isLoading ? (
      <p>spinner</p>
    ) : (
      <div className="dashboardCont">
        <div className="userInfoCont">
          <h2>User Profile Page</h2>
          <p>Welcome, {name}</p>
          <p>Email: {email}</p>
          <p>Phone Number: {phoneNumber}</p>
          <p>Address: {address}</p>
          <p>Project Group: {projectGroup}</p>
        </div>

        <div className="inputFormCont">
          <h2>Edit Profile Information</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="updateName">
              Name:
              <input
                type="text"
                name="updateName"
                value={newName}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="updateEmail">
              Email:
              <input
                type="text"
                name="updateEmail"
                value={newEmail}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="updatePhone">
              Phone Number:
              <input
                type="text"
                name="updatePhone"
                placeholder="(xxx) xxx-xxxx"
                value={newPhone}
                onChange={this.handleChange}
              />
            </label>
            <h3>Address:</h3>
            <label htmlFor="updateStreet">
              Street:
              <input
                type="text"
                name="updateStreet"
                placeholder="2311 Bowditch Street"
                value={newStreet}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="updateStreet">
              City:
              <input
                type="text"
                name="updateCity"
                placeholder="Berkeley"
                value={newCity}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="updateStreet">
              State:
              <input
                type="text"
                name="updateState"
                placeholder="CA"
                value={newState}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="updateStreet">
              Zip Code:
              <input
                type="text"
                name="updateZip"
                placeholder="94704"
                value={newZip}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <p>{status}</p>
        </div>
      </div>
    );
  }
}
