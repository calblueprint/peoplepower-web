import React from 'react';
import '../../styles/UserProfilePage.css';
import {
  getRecord,
  getRecordWithPromise,
  getRecordFromAttribute,
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
      error: '',
      status: '',
      updateName: '',
      updateEmail: '',
      updatePhone: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newPerson = {
      id: this.state.id,
      fields: {
        Name: this.state.updateName,
        Email: this.state.updateEmail,
        'Phone Number': this.state.updatePhone
      }
    };
    // note there should be an function that I write that just does this rerendering
    updatePersonWithPromise(newPerson).then(payload => {
      this.setState({
        status: payload.status,
        name: this.state.updateName,
        email: this.state.updateEmail
      });
    });
  }

  componentDidMount() {
    // id taken from URL. React Router's useParams() threw an "invalid hook" error.
    const { id } = this.props.match.params;
    this.setState({
      id
    });

    // QUESTION: Do these promises need to be assigned to a variable?
    const getUser = getRecordWithPromise('Person', id).then(payload => {
      // Current user information
      const {
        Email: email,
        'Phone Number': phoneNumber,
        Owner: owner,
        Address: addressID,
        Tags: tags,
        'User Login': userLogin,
        Name: name
      } = payload.record;

      this.setState({
        email,
        updateEmail: email,
        name,
        updateName: name,
        phoneNumber,
        updatePhone: phoneNumber
      });

      // Getting project group
      const getProjectGroup = getRecordWithPromise('Owner', owner)
        .then(payload => {
          const { 'Project Group': projectGroupID } = payload.record;

          getRecordWithPromise('Project Group', projectGroupID)
            .then(payload => {
              const { Name: name } = payload.record;
              this.setState({
                projectGroup: name
              });
            })
            .catch(err => {
              this.setState({
                projectGroup: 'User has not joined a project group.'
              });
            });
        })
        .catch(err => {
          this.setState({
            projectGroup: 'User is not an owner.'
          });
        });

      // Getting Address
      const getAddress = getRecordWithPromise('Address', addressID)
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
          this.setState({
            address: 'No address on file.'
          });
        });
    });
  }

  render() {
    return (
      <div className="dashboardCont">
        <div className="userInfoCont">
          <h2>User Profile Page</h2>
          <p>Welcome, {this.state.name}</p>
          <p>Email: {this.state.email}</p>
          <p>Phone Number: {this.state.phoneNumber}</p>
          <p>Address: {this.state.address}</p>
          <p>Project Group: {this.state.projectGroup}</p>
        </div>

        <div className="inputFormCont">
          <h2>Edit Profile Information</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="updateName"
                value={this.state.newName}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="updateEmail"
                value={this.state.newEmail}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="updatePhone"
                placeholder="(xxx) xxx-xxxx"
                value={this.state.newPhone}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <p>{this.state.status}</p>
        </div>
      </div>
    );
  }
}
