import React from 'react';

const { loginUser } = require('../../lib/auth.js');
const { getLoggedInUserId } = require('../../lib/auth.js');

const HOME_ROUTE = '/dashboard';
const SIGNUP_ROUTE = '/signup';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passwordHash: ''
    };

    // BINDINGS
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUpOnClick = this.handleSignUpOnClick.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (getLoggedInUserId()) {
      history.push(HOME_ROUTE);
    }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ passwordHash: event.target.value });
  }

  handleSignUpOnClick() {
    const { history } = this.props;

    history.push(SIGNUP_ROUTE);
  }

  async handleSubmit(evt) {
    const { email, passwordHash } = this.state;
    console.log(evt.target.value);
    evt.preventDefault();
    const res = await loginUser(email, passwordHash);
    if (res.found && res.match) {
      this.segueToHome(evt);
    } else {
      // alert('Invalid email or password!');
    }
  }

  segueToHome(evt) {
    const { history } = this.props;

    history.push(HOME_ROUTE);
    evt.preventDefault();
  }

  render() {
    const { email, passwordHash } = this.state;
    return (
      <div>
        <h1>Login to People Power</h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          Email
          <br />
          <input type="text" value={email} onChange={this.handleEmailChange} />
          <br />
          Password
          <br />
          <input
            type="password"
            value={passwordHash}
            onChange={this.handlePasswordChange}
          />
          <br />
          <button className="primary-button" type="submit">
            Login
          </button>
        </form>
        <button
          type="button"
          className="primary-button"
          onClick={this.handleSignUpOnClick}
        >
          New here? Sign Up
        </button>
      </div>
    );
  }
}
export default Login;
