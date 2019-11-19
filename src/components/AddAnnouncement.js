import React from 'react';
import '../styles/Community.css';
import { createRecord } from '../lib/request';

export default class AddAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      submitSuccess: 0,
      status: '',
      submitProgress: 0
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

    this.setState({
      submitProgress: 1
    });

    if (!message) {
      this.setState({
        submitSuccess: -1,
        submitProgress: -1,
        status: 'Announcement is empty!'
      });
      return;
    }

    const { usersID: id, usersGroup: projectGroup, updateCards } = this.props;
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
        status: 'Announcement posted!',
        message: '',
        submitProgress: 1
      });

      updateCards(newMessage);
    });
  }

  render() {
    const { message, submitSuccess, status, submitProgress } = this.state;
    let btnStatus = '';
    let btnText = '';

    if (submitSuccess > 0) {
      btnStatus = 'btn-success';
    } else if (submitSuccess < 0) {
      btnStatus = 'btn-fail';
    } else {
      btnStatus = '';
    }

    if (submitProgress > 0) {
      btnText = 'Done';
    } else if (submitProgress < 0) {
      btnText = 'Error';
    } else {
      btnText = 'Post';
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
          <input type="submit" value={btnText} className={btnStatus} />
        </form>
        <p>{status}</p>
      </div>
    );
  }
}
