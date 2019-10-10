import React from 'react';

let loginUser = require('../utils/airtableUtils.js').loginUser;

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passwordHash: '',
        };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({passwordHash: event.target.value});
    }

    async handleSubmit(evt) {
        console.log(evt.target.value);
        evt.preventDefault();
        // let email = 'Joshua Goh';
        // let passwordHash = '222';
        console.log("I got here");
        let res = await loginUser(this.state.email, this.state.passwordHash);
        if (res.found && res.match) {
            this.segueToHome(evt);
        } else {
            alert("invalid email or password!")
        }
        // console.log(res);
    }

    segueToHome(evt) {
        // alert("A name was submitted: " + this.state.value);
        // let path = `/home`;
        // this.props.history.push(path);
        this.props.history.push("/home");
        evt.preventDefault();
    }
    
    render() {
        return (
            <div>     
                <h1>Login to People Power</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    Email
                    <br />
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
                    <br />
                    Password
                    <br />
                    <input type="text" value={this.state.passwordHash} onChange={this.handlePasswordChange}/>
                    <br />
                    <button className="primary-button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        );
    }

}
export default Login;