import React from 'react';
import '../styles/Community.css';
import { createRecord } from '../lib/request';

export default class AddAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target.name;
    this.setState({
      [target]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { message } = this.state;
    const { usersID: id, usersGroup: projectGroup } = this.props;
    const newMessage = {
      fields: {
        Author: [id],
        'Project Group': [projectGroup],
        Message: message
      }
    };

    console.log(newMessage);

    createRecord('Announcement', newMessage).then(payload => {
      console.log(payload);
    });
  }

  render() {
    const { message } = this.state;
    return (
      <div className="card">
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            name="message"
            value={message}
            placeholder="Write something..."
            onChange={this.handleChange}
          />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}
