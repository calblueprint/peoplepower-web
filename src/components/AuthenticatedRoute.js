/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSignedIn } from '../lib/credentials';

class AuthenticatedRoute extends React.PureComponent {
  render() {
    const {
      userCredentials,
      component: Component,
      credential,
      noauth,
      ...rest
    } = this.props;

    let authed;
    // If credential prop exists, ensure they are authorized
    // If noauth prop exists, ensure they are NOT signed in
    // else, just ensure they are signed in
    if (credential) {
      authed = userCredentials.includes(credential);
    } else if (noauth) {
      authed = !isSignedIn(userCredentials);
    } else {
      authed = isSignedIn(userCredentials);
    }

    // TODO: If you visit a non-authenticated route, it should show you an error or something.
    // Right now it just redirects to the homepage
    // Alternatively, we can render a generic 404 component if they reach somewhere they shouldn't, like github does
    return (
      <Route
        {...rest}
        render={props =>
          authed ? (
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
