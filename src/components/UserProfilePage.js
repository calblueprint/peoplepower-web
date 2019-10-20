import React from 'react';
import '../styles/UserProfilePage.css'; 
import { getRecord, getRecordWithPromise, getRecordFromAttribute, updatePersonWithPromise } from '../request'

export default class UserProfilePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			email: '',
			name: 'user',
			phoneNumber: '',
			address: '',
			projectGroup: '',
			error: '',
			status: '',
			newName: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({newName: event.target.value})
	}

	handleSubmit(event) {
		event.preventDefault();
		let newPerson = {
			id: this.state.id,
			fields: {
				"Name" : this.state.newName
			}
		}
		// note there should be an function that I write that just does this rerendering
		updatePersonWithPromise(newPerson).then((payload) => {
			this.setState({status: payload.status})
			getRecordWithPromise('Person', this.state.id).then((payload) => {
				let { "Name": name } = payload.record
				this.setState({
					name: name
				})
			})
		})
	}

	componentDidMount() {
		// id taken from URL. React Router's useParams() threw an "invalid hook" error.
		let { id } = this.props.match.params
		this.setState({
			id: id
		})

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
					<h3>User Profile Page</h3>
					<p>Welcome, {this.state.name}</p>
					
					<p>Email: {this.state.email}</p>
					<p>Phone Number: {this.state.phoneNumber}</p>
					<p>Address: {this.state.address}</p>
					<p>Project Group: {this.state.projectGroup}</p>
				
				</div>

				<div className="inputFormCont">
					<h2>Edit Profile Information</h2>
					<form onSubmit={this.handleSubmit}>
						<label>
							Name:
							<input type="text" value={this.state.newName} onChange={this.handleChange} />
						</label>
						<input type="submit" value="Submit" />
					</form>
					<p>{this.state.status}</p>
				</div>
			</div>
		);
	}
}
