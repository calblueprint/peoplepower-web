import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from '../../assets/404-01.png';
import '../../styles/ErrorPage.css';

export default class ErrorPage extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="error-image">
          <img className="error-image-file" src={ErrorImage} alt="404" />
        </div>
        <div className="page-not-found-text">
          <h3>Page not found</h3>
          <h6>Oops! Something went wrong.</h6>
        </div>
        <div className="back-to-homepage-button">
          <Link to="/">Back to homepage</Link>
        </div>
      </div>
    );
  }
}
