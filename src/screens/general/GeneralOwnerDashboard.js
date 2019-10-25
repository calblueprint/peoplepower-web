import React from 'react';
import '../../styles/GeneralOwnerDashboard.css'; 
import { getRecord, getRecordWithPromise } from '../../lib/request'

export default class GeneralOwnerDashboard extends React.Component {
<<<<<<< Updated upstream
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			name: 'user',
			phoneNumber: '',
			address: '',
			projectGroup: '',
			error: ''
		}
	}

	componentDidMount() {
		// hard-coded my id
		const id = 'recfnsL4HDoNHril6';

		// QUESTION: Do these promises need to be assigned to a variable?
		let getUser = getRecordWithPromise('Person', id).then((payload) => {
			// Current user information
			let { "Email": email, "Phone Number" : phoneNumber, "Owner": owner, 
				 "Address": addressID, "Tags": tags, "User Login" : userLogin, "Name": name } = payload.record

				this.setState({
					email: email,
					name: name,
					phoneNumber: phoneNumber
				});

			// Getting project group
			let getProjectGroup = getRecordWithPromise('Owner', owner).then((payload) => {
				let { "Project Group": projectGroupID } = payload.record

				getRecordWithPromise('Project Group', projectGroupID).then((payload) => {
					let { "Name": name } = payload.record
					this.setState({
						projectGroup: name
					})
				}).catch((err) => {
						this.setState({
							projectGroup: 'User has not joined a project group.'
						})
					})
			}).catch((err) => {
				this.setState({
					projectGroup: 'User is not an owner.'
				})
			})
=======
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
    const id = getLoggedInUserId(); // THIS IS NOT THE ID YOU ARE LOOK FOR HEHE.
    if (!id) {
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
    console.log(id);

    getRecordWithPromise('User Login', id)
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
>>>>>>> Stashed changes

			// Getting Address
			let getAddress = getRecordWithPromise('Address', addressID).then((payload) => {

				let { "City": city, "Street": street, "State": state, "Zip Code": zipCode } = payload.record

				this.setState({
					address: `${street}, ${city}, ${state} ${zipCode}`
				});
			}).catch((err) => {
				this.setState({
					address: 'No address on file.'
				});
			})

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
