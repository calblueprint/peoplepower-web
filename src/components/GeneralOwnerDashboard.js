import React from 'react';
import '../styles/GeneralOwnerDashboard.css'; 
import { getRecord, getRecordWithPromise } from '../request'


export default class GeneralOwnerDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			name: 'user',
			phoneNumber: ''

		}
	}

	componentDidMount() {
		// hard-coded my id
		const id = 'recfnsL4HDoNHril6';
		let record = getRecordWithPromise('Person', id).then((payload) => {
			//use array deconstructing
			let { "Email": email, "Phone Number" : phoneNumber, "Owner": owner, 
				 "Address": address, "Tags": tags, "User Login" : userLogin, "Name": name } = payload.record
			this.setState({
				email: email,
				name: name,
				phoneNumber: phoneNumber
			});
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
				</div>
			</div>
		);
	}
}
