import React from 'react';
import { loginUser } from '../../lib/authUtils';
import '../../styles/Login.css';
import '../../styles/main.css';
import Constants from '../../constants';
import Error from '../../assets/error.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passwordHash: '',
      isValid: true
    };
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    // TODO: Hash the password locally
    this.setState({ passwordHash: event.target.value });
  };

  handleSignUpOnClick = () => {
    const { history } = this.props;
    history.push(Constants.SIGNUP_ROUTE);
  };

  handleSubmit = async evt => {
    const { email, passwordHash } = this.state;
    evt.preventDefault();
    try {
      const res = await loginUser(email, passwordHash);
      if (res.found && res.match) {
        this.segueToHome(evt);
      } else {
        this.setState({
          isValid: false
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  checkValid() {
    const { isValid } = this.state;
    return isValid ? 'b-is-valid' : 'b-is-not-valid';
  }

  segueToHome(evt) {
    const { history } = this.props;

    history.push(Constants.HOME_ROUTE);
    evt.preventDefault();
  }

  render() {
    const { email, passwordHash, isValid } = this.state;
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
              className={` input-gray ${this.checkValid(isValid)}`}
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
              className={` input-gray ${this.checkValid(isValid)}`}
            />
          </div>
          <div className=" t-center">
            <button
              type="submit"
              className="btn btn--rounded btn--pink btn--size12 login-button"
            >
              Login
            </button>
          </div>
        </form>
        {isValid ? (
          '\u00A0'
        ) : (
          <div className="error-container mt-15">
            <img src={Error} alt="error" className="error-icon" />
            <div className="error-text">Incorrect email or password</div>
          </div>
        )}
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
