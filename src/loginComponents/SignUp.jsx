import React from 'react';

const LOGIN_ROUTE = '/home';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    
    // BINDINGS
    this.handleLoginOnClick = this.handleLoginOnClick.bind(this);
  }

  handleLoginOnClick(event) {
    this.props.history.push(LOGIN_ROUTE);
  }

  render() {
    return (
      <div>
        Sign up Here
        <button className="primary-button" onClick={this.handleLoginOnClick}>
          Have an account? Login
        </button>
      </div>
    );
  }
}

export default SignUp;
