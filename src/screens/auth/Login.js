import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../lib/authUtils';
import '../../styles/Login.css';
import '../../styles/main.css';

const HOME_ROUTE = '/';
const SIGNUP_ROUTE = '/onboarding';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passwordHash: ''
    };
  }

  componentDidMount() {
    const { history, authenticated } = this.props;
    if (authenticated) {
      history.push(HOME_ROUTE);
    }
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
    history.push(SIGNUP_ROUTE);
  };

  handleSubmit = async evt => {
    const { email, passwordHash } = this.state;
    evt.preventDefault();
    try {
      const res = await loginUser(email, passwordHash);
      if (res.found && res.match) {
        this.segueToHome(evt);
      } else {
        // alert('Invalid email or password!');
      }
    } catch (err) {
      console.error(err);
    }
  };

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
              className="btn btn--rounded btn--pink btn--size12 login-button"
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

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated
});

export default connect(mapStateToProps)(Login);
