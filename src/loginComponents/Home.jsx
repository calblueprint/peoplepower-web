import React from 'react';
const isLoggedIn = require('../utils/airtableUtils.js').isLoggedIn;
const logOut = require('../utils/airtableUtils.js').logOut;

const ROOT_PATH = '/';

class Home extends React.Component {

  constructor(props) {
    super(props);
    
    // BINDINGS
    this.handleOnClick = this.handleOnClick.bind(this);
}

  componentDidMount() {
    if (!isLoggedIn()) {
        this.props.history.push(ROOT_PATH);
    }
  }

  handleOnClick() {
    logOut();
    this.props.history.push(ROOT_PATH);
  }

  render() {
    return (
      <div>
        <h1>Home here</h1>
        <br />
        <button className="primary-button" onClick={this.handleOnClick}>
            Logout
        </button>
      </div>
    );
  }
}

export default Home;