/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSignedIn } from '../lib/credentials';

class AuthenticatedRoute extends React.PureComponent {
  isAuthorized() {
    const { userCredentials, credential, noauth } = this.props;

    // If credential prop exists, ensure they are authorized
    // If noauth prop exists, ensure they are NOT signed in
    // else, just ensure they are signed in
    if (credential) {
      return userCredentials.includes(credential);
    }
    if (noauth) {
      return !isSignedIn(userCredentials);
    }
    return isSignedIn(userCredentials);
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const authorized = this.isAuthorized();
    return (
      <Route
        {...rest}
        render={props =>
          authorized ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      />
    );
  }
}
const mapStateToProps = state => ({
  userCredentials: state.userData.credentials
});
export default connect(mapStateToProps)(AuthenticatedRoute);
