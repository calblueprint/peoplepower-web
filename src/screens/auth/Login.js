import React from 'react';
import { loginUser } from '../../lib/airlock/airlock';
import '../../styles/Login.css';
import '../../styles/main.css';
import Constants from '../../constants';
import ErrorIcon from '../../assets/error.svg';
import LoadingComponent from '../../components/LoadingComponent';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passwordHash: '',
      loading: false,
      showLoginError: false
    };
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ passwordHash: event.target.value });
  };

  handleSignUpOnClick = () => {
    const { history } = this.props;
    history.push(Constants.SIGNUP_ROUTE);
  };

  handleSubmit = async evt => {
    this.setState({ loading: true });
    const { email, passwordHash } = this.state;
    evt.preventDefault();
    try {
      const res = await loginUser(email, passwordHash);
      if (res.found && res.match) {
        this.segueToHome(evt);
      } else {
        this.setState({
          showLoginError: true,
          loading: false
        });
      }
    } catch (err) {
      this.setState({ loading: false });
      console.error(err);
    }
  };

  toggleValidColor() {
    const { showLoginError } = this.state;
    return showLoginError ? 'b-is-not-valid' : 'b-is-valid';
  }

  segueToHome(evt) {
    const { history } = this.props;

    history.push(Constants.HOME_ROUTE);
    evt.preventDefault();
  }

  render() {
    const { email, passwordHash, showLoginError, loading } = this.state;

    if (loading) {
      return <LoadingComponent />;
    }
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
              className={` input-gray ${this.toggleValidColor(showLoginError)}`}
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
              className={` input-gray ${this.toggleValidColor(showLoginError)}`}
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
        {!showLoginError ? (
          '\u00A0'
        ) : (
          <div className="error-container mt-15">
            <img src={ErrorIcon} alt="error" className="mr-1" />
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
