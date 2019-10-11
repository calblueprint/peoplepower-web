import React from 'react';

const loginUser = require('../utils/airtableUtils.js').loginUser;
const isLoggedIn = require('../utils/airtableUtils.js').isLoggedIn;
const HOME_ROUTE = '/home';
const SIGNUP_ROUTE = '/signup';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passwordHash: '',
        };
        
        // BINDINGS
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUpOnClick = this.handleSignUpOnClick.bind(this);
    }

    componentDidMount() {
        if (isLoggedIn()) {
            this.props.history.push(HOME_ROUTE);
        }
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({passwordHash: event.target.value});
    }

    handleSignUpOnClick(event) {
        this.props.history.push(SIGNUP_ROUTE);
    }

    async handleSubmit(evt) {
        console.log(evt.target.value);
        evt.preventDefault();
        let res = await loginUser(this.state.email, this.state.passwordHash);
        if (res.found && res.match) {
            this.segueToHome(evt);
        } else {
            alert("Invalid email or password!")
        }
    }

    segueToHome(evt) {
        this.props.history.push(HOME_ROUTE);
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
                    <input type="password" value={this.state.passwordHash} onChange={this.handlePasswordChange}/>
                    <br />
                    <button className="primary-button" type="submit">
                        Login
                    </button>
                </form>
                <button className="primary-button" onClick={this.handleSignUpOnClick}>
                        New here? Sign Up
                </button>
            </div>
        );
    }

}
export default Login;