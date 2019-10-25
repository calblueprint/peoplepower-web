import React from 'react';
import '../../styles/UserProfilePage.css';
import {
  getRecordWithPromise,
  updatePersonWithPromise
} from '../../lib/request';

export default class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      name: 'user',
      phoneNumber: '',
      address: '',
      projectGroup: '',
      status: '',
      updateName: '',
      updateEmail: '',
      updatePhone: ''
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

    getRecordWithPromise('Person', id)
      .then(payload => {
        ({
          Email: email,
          'Phone Number': phoneNumber,
          Owner: owner,
          Address: addressID,
          Name: name
        } = payload.record);

        this.setState({
          email,
          updateEmail: email,
          name,
          updateName: name,
          phoneNumber,
          updatePhone: phoneNumber
        });

        // Getting project group
        return getRecordWithPromise('Owner', owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroupID } = payload.record;

        return getRecordWithPromise('Project Group', projectGroupID);
      })
      .then(payload => {
        const { Name: projectGroupName } = payload.record;
        this.setState({
          projectGroup: projectGroupName
        });

        // Getting Address
        return getRecordWithPromise('Address', addressID);
      })
      .then(payload => {
        const {
          City: city,
          Street: street,
          State: state,
          'Zip Code': zipCode
        } = payload.record;

        this.setState({
          address: `${street}, ${city}, ${state} ${zipCode}`
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
    const { id, updateName, updateEmail, updatePhone } = this.state;
    const newPerson = {
      id,
      fields: {
        Name: updateName,
        Email: updateEmail,
        'Phone Number': updatePhone
      }
    };
    // note there should be an function that I write that just does this rerendering
    updatePersonWithPromise(newPerson).then(payload => {
      // const { updateName, updateEmail } = this.state;
      this.setState({
        status: payload.status,
        name: updateName,
        email: updateEmail
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
      status
    } = this.state;
    return (
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
            <input type="submit" value="Submit" />
          </form>
          <p>{status}</p>
        </div>
      </div>
    );
  }
}
