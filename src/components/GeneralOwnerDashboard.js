import React from 'react';
import '../styles/GeneralOwnerDashboard.css'; 
import { getRecord, getRecordWithPromise, getRecordFromAttribute } from '../request'


export default class GeneralOwnerDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			name: 'user',
			phoneNumber: '',
			address: '',
			projectGroup: ''
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
				let { "Project Group": projectGroup } = payload.record

				getRecordWithPromise('Project Group', projectGroup).then((payload) => {
					let { "Name": name } = payload.record
					this.setState({
						projectGroup: name
					})
				})
			})

			// Getting Address
			let getAddress = getRecordWithPromise('Address', addressID).then((payload) => {

				let { "City": city, "Street": street, "State": state, "Zip Code": zipCode } = payload.record

				this.setState({
					address: `${street}, ${city}, ${state} ${zipCode}`
				});
			})

		})
	}

	render() {
		return (
			<div className="dashboardCont"> 
				<h3>General Owner Dashboard</h3>
				<p>Welcome, {this.state.name}</p>
				<div>
					<p>Email: {this.state.email}</p>
					<p>Phone Number: {this.state.phoneNumber}</p>
					<p>Address: {this.state.address}</p>
					<p>Project Group: {this.state.projectGroup}</p>
				</div>
			</div>
		);
	}
}
