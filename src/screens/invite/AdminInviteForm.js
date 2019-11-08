import React from 'react';
// import '../../styles/Form.css';

class AdminInviteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      inviteeName: '',
      inviteeLastName: '',
      inviteeEmail: '',
      inviteeType: 'generalMember'
    };
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    // prevent parameters to be carried in the URL
    e.preventDefault();
    // console.log(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      inviteeName: '',
      inviteeLastName: '',
      inviteeEmail: '',
      inviteeType: 'generalMember'
    });
  };

  render() {
    const { username } = this.state;
    const { firstName } = this.state;
    const { lastName } = this.state;
    const { email } = this.state;
    const { inviteeName } = this.state;
    const { inviteeLastName } = this.state;
    const { inviteeEmail } = this.state;
    const { inviteeType } = this.state;

    return (
      <form>
        <header>
          {' '}
          <h1> Invite a New Member </h1>
        </header>

        <br />
        <h2> Current Member Information: </h2>
        <br />
        <label> Username: </label>
        <input
          name="username"
          placeholder="username"
          type="text"
          value={username}
          onChange={e => this.change(e)}
        />
        <br />
        <label> First Name: </label>
        <input
          name="firstName"
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={e => this.change(e)}
        />
        <br />
        <label> Last Name: </label>
        <input
          name="lastName"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={e => this.change(e)}
        />
        <br />
        <label> Email: </label>
        <input
          name="email"
          placeholder="email"
          type="text"
          value={email}
          onChange={e => this.change(e)}
        />
        <br />
        <h2> Invitee Information: </h2>
        <br />
        <label> Name of the Invitee: </label>
        <input
          name="inviteeName"
          placeholder="Invitee Name"
          type="text"
          value={inviteeName}
          onChange={e => this.change(e)}
        />
        <br />
        <label> Last Name of the Invitee: </label>
        <input
          name="inviteeLastName"
          placeholder="Invitee Lastname"
          type="text"
          value={inviteeLastName}
          onChange={e => this.change(e)}
        />
        <br />
        <label> Invitee Email: </label>
        <input
          name="inviteeEmail"
          placeholder="intivee Email"
          type="text"
          value={inviteeEmail}
          onChange={e => this.change(e)}
        />
        <br />
        <label> Positions interested: </label>
        <select value={inviteeType} onChange={e => this.change(e)}>
          <option value="generalMember"> General Member </option>
          <option value="stakeHolder"> Stakeholder </option>
        </select>
        <br />
        <button type="submit" onClick={e => this.onSubmit(e)}>
          {' '}
          Submit{' '}
        </button>
        <br />
      </form>
    );
  }
}
export default AdminInviteForm;
