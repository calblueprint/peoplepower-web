import React from 'react';
import '../../../styles/Community.css';
import { createAnnouncement } from '../../../lib/airtable/request';
import { refreshUserData } from '../../../lib/redux/userData';
import Colors from '../../../colors';
import PPModal from '../../../components/PPModal';

const { PP_BLUE } = Colors;

const STATUS_ERR = -1;
const STATUS_IN_PROGRESS = 0;
const STATUS_SUCCESS = 1;

export default class AddAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      submitSuccess: STATUS_IN_PROGRESS,
      status: '',
      submitProgress: STATUS_IN_PROGRESS,
      showAnnouncementModal: false
    };
  }

  handleChange = event => {
    const target = event.target.name;
    this.setState({
      [target]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { message } = this.state;

    if (!message) {
      this.setState({
        submitSuccess: STATUS_ERR,
        submitProgress: STATUS_ERR,
        status: 'Announcement is empty!'
      });
      return;
    }

    const { owner } = this.props;
    const newMessage = {
      authorId: owner.id,
      projectGroupId: owner.projectGroupId,
      message
    };

    await createAnnouncement(newMessage);
    this.setState({
      submitSuccess: true,
      status: 'Announcement posted!',
      message: '',
      submitProgress: STATUS_SUCCESS,
      showAnnouncementModal: true
    });
    await refreshUserData(owner.id, true);
  };

  render() {
    const {
      message,
      submitSuccess,
      status,
      submitProgress,
      showAnnouncementModal
    } = this.state;
    let btnStatus = '';
    let btnText = '';

    switch (submitSuccess) {
      case STATUS_ERR:
        btnStatus = 'btn-fail';
        break;
      case STATUS_IN_PROGRESS:
        btnStatus = '';
        break;
      case STATUS_SUCCESS:
        btnStatus = 'btn-success';
        break;
      default:
        break;
    }

    switch (submitProgress) {
      case STATUS_ERR:
        btnText = 'Error';
        break;
      case STATUS_IN_PROGRESS:
        btnText = 'Post';
        break;
      case STATUS_SUCCESS:
        btnText = 'Done';
        break;
      default:
        break;
    }

    return (
      <div className="announcement-card add-announcement announcement-limit-width">
        <PPModal
          showModal={showAnnouncementModal}
          body="This announcement will go out to everyone in your project group! You may not see the changes for a few minutes."
          header="Announcement Created!"
          actionName="Ok"
          handleCloseModal={() => {
            this.setState({ showAnnouncementModal: false });
          }}
        />
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            name="message"
            value={message}
            placeholder="Write something..."
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value={btnText}
            className={btnStatus}
            style={{ background: PP_BLUE, color: 'white' }}
          />
        </form>
        <p>{status}</p>
      </div>
    );
  }
}
