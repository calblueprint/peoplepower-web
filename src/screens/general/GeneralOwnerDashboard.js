import React from 'react';
import '../../styles/GeneralOwnerDashboard.css'; 
import { getRecord, getRecordWithPromise } from '../../lib/request'
import { getLoggedInUserId } from '../../lib/auth'

export default class GeneralOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'N/A',
      name: 'user',
      phoneNumber: 'N/A',
      address: '',
      projectGroup: ''
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const userLogInID = getLoggedInUserId(); // THIS IS NOT THE ID YOU ARE LOOK FOR HEHE.
    if (!userLogInID) {
      // They shouldn't be able to access this screen
      history.push('/');
      return;
    }

    let personID;
    let email;
    let phoneNumber;
    let name;
    let owner;
    let addressID;

    getRecordWithPromise('User Login', userLogInID)
      .then(payload => {
        personID = payload.record.Person;
        return getRecordWithPromise('Person', personID);
      })
      .then(payload => {
        ({
          Name: name,
          Email: email,
          'Phone Number': phoneNumber,
          Owner: owner,
          Address: addressID
        } = payload.record);

        this.setState({
          email: email,
          name: name,
          phoneNumber: phoneNumber
        });

        return getRecordWithPromise('Owner', owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroupID } = payload.record;
        return getRecordWithPromise('Project Group', projectGroupID);
      })
      .then(payload => {
        const { Name: projectGroupName } = payload.record;
        this.setState({
          projectGroup: projectGroupName
        });
        return getRecordWithPromise('Address', addressID);
      })
      .then(payload => {
        const {
          City: city,
          Street: street,
          State: state,
          'Zip Code': zipCode
        } = payload.record;

        this.setState({
          address: `${street}, ${city}, ${state} ${zipCode}`
        });

      }).catch((err) => {
				this.setState({
					address: 'No address on file.'
				});
			})
	}

	render() {
		return (
			<div className="dashboardCont">
				<div className="userInfoCont"> 
					<h2>General Owner Dashboard</h2>
					<p>Welcome, {this.state.name}</p>
					<p>Email: {this.state.email}</p>
					<p>Phone Number: {this.state.phoneNumber}</p>
					<p>Address: {this.state.address}</p>
					<p>Project Group: {this.state.projectGroup}</p>
				</div>
			</div>
		);
	}
}
