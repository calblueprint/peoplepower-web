/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class AuthenticatedRoute extends React.PureComponent {
  render() {
    const { component: Component, authed, ...rest } = this.props;
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
