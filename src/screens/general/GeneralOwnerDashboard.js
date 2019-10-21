import React from 'react';
import '../../styles/GeneralOwnerDashboard.css';
import { getRecordWithPromise } from '../../lib/request';

export default class GeneralOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: 'user',
      phoneNumber: ''
    };
  }

  componentDidMount() {
    // hard-coded my id
    const id = 'recfnsL4HDoNHril6';
    getRecordWithPromise('Person', id).then(payload => {
      // use array deconstructing
      const {
        Email: email,
        'Phone Number': phoneNumber,
        Name: name
      } = payload.record;
      this.setState({
        email,
        name,
        phoneNumber
      });
    });
  }

  render() {
    const { name, email, phoneNumber } = this.state;
    return (
      <div className="dashboardCont">
        <h3>General Owner Dashboard</h3>
        <p>Welcome, {name}</p>
        <div>
          <p>Email: {email}</p>
          <p>Phone Number: {phoneNumber}</p>
        </div>
      </div>
    );
  }
}
