import React from 'react';
import '../styles/Community.css';
import { createRecord } from '../lib/request';

export default class AddAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      submitSuccess: 0,
      status: ''
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

    if (!message) {
      this.setState({
        submitSuccess: -1,
        status: 'Announcement is empty!'
      });
      return;
    }

    const { usersID: id, usersGroup: projectGroup } = this.props;
    const newMessage = {
      fields: {
        Author: [id],
        'Project Group': [projectGroup],
        Message: message
      }
    };
    createRecord('Announcement', newMessage).then(() => {
      this.setState({
        submitSuccess: true,
        status: 'Announcement posted!'
      });
    });
  }

  render() {
    const { message, submitSuccess, status } = this.state;
    let btnStatus = '';

    if (submitSuccess > 0) {
      btnStatus = 'btn-success';
    } else if (submitSuccess < 0) {
      btnStatus = 'btn-fail';
    } else {
      btnStatus = '';
    }

    return (
      <div className="card AddAnnouncement">
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            name="message"
            value={message}
            placeholder="Write something..."
            onChange={this.handleChange}
          />
          <input type="submit" value="Post" className={btnStatus} />
        </form>
        <p>{status}</p>
      </div>
    );
  }
}
