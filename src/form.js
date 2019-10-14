import React from 'react'


class Form extends React.Component {
  
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
  }
}
  
change = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
}; 

onSubmit = e => {
  // prevent parameters to be carried in the URL 
  e.preventDefault();
  alert("Thank you for your submission!");
  this.props.onSubmit(this.state);
  console.log(this.state);
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
    return (
      <form> 
        <h1> Invite a New Member </h1>
        <br/>
        <h2> Current Member Information: </h2>
        <br/>
            <label> Username: </label>
            <input 
                name='username' 
                placeholder= 'username'
                type='text'
                value={this.state.username} 
                onChange={e => this.change(e)}/>
        <br/>
            <label> First Name: </label>
            <input name='firstName' 
                placeholder= 'First Name'
                type='text'
                value={this.state.firstName} 
                onChange={e => this.change(e)} />
        <br/>
            <label> Last Name: </label>
            <input 
                name='lastName' 
                placeholder= 'Last Name'
                type='text'
                value={this.state.lastName} 
                onChange={e => this.change(e)} />
        <br/>
            <label> Email: </label>
            <input 
                name='email' 
                placeholder= 'email'
                type='text'
                value={this.state.email} 
                onChange={e => this.change(e)} />
        <br/>
        <h2> Invitee Information: </h2>
        <br/>
            <label> Name of the Invitee: </label>
            <input 
                name='inviteeName' 
                placeholder= 'Invitee Name'
                type='text'
                value={this.state.inviteeName} 
                onChange={e => this.change(e)}/>
        <br/>
            <label> Last Name of the Invitee: </label>
            <input 
                name='inviteeLastName' 
                placeholder= 'Invitee Lastname'
                type='text'
                value={this.state.inviteeLastName} 
                onChange={e => this.change(e)}/>
        <br/>
        <label> Invitee's Email: </label>
            <input 
                name='inviteeEmail' 
                placeholder= 'intivee Email'
                type='text'
                value={this.state.inviteeEmail} 
                onChange={e => this.change(e)}/>
        <br/>
        <label> Positions interested: </label>
            <select value={this.state.inviteeType} onChange={e => this.change(e)}>
                <option value="generalMember"> General Member </option>
                <option value="stakeHolder"> Stakeholder </option>
            </select>     
        <br/>
        <button onClick={e =>this.onSubmit(e)}> Submit </button>
        <br/>
      </form>
    )
  }
}
export default Form