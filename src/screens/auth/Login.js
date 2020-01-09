import React from 'react';
import '../../styles/Login.css';
import '../../styles/main.css';

const { loginUser } = require('../../lib/auth.js');
const { getLoggedInUserId } = require('../../lib/auth.js');

const HOME_ROUTE = '/dashboard';
const SIGNUP_ROUTE = '/onboarding';

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
      <div className="center card flex column">
        <h1 className="t-center login-header">Welcome back!</h1>
        <br />
        <form onSubmit={this.handleSubmit} className="flex column ">
          <div className="w-100 login-input-mb">
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              placeholder="Email address"
              onChange={this.handleEmailChange}
              defaultValue={email}
              className="input-gray"
            />
          </div>
          <div className="w-100 ">
            <label className="login-label" htmlFor="email">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
              defaultValue={passwordHash}
              className="input-gray"
            />
          </div>
          <div className=" t-center">
            <button
              type="submit"
              className="pp-pink-rounded-button login-button"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex onboarding-col login-hyperlink-group">
          <button type="button" className="login-hyperlink">
            Forgot password?
          </button>
          <button
            type="button"
            className="login-hyperlink"
            onClick={this.handleSignUpOnClick}
          >
            Create an account
          </button>
        </div>
      </div>
    );
  }
}
export default Login;
