import React from 'react';
import '../../styles/Community.css';
import { getRecord, getMultipleFromAttr } from '../../lib/request';
import { getLoggedInUserId } from '../../lib/auth';
import AnnouncementList from '../../components/AnnouncementList';
import AddAnnouncement from '../../components/AddAnnouncement';

export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      usersID: '',
      usersGroup: '',
      isLoading: true
    };

    this.addTempCard = this.addTempCard.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      history.push('/');
      return;
    }
    this.setState({
      usersID: id
    });

    getRecord('Person', id)
      .then(payload => {
        const { Owner: owner } = payload.record;
        return getRecord('Owner', owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroup } = payload.record;
        this.setState({
          usersGroup: projectGroup[0]
        });
        return getMultipleFromAttr(
          'Announcement',
          'Project Group',
          `${projectGroup[0]}`
        );
      })
      .then(payload => {
        this.setState({
          cards: payload,
          isLoading: false
        });
      });
  }

  addTempCard(announcement) {
    const { cards } = this.state;
    const updatedCards = [announcement, ...cards];
    this.setState({
      cards: updatedCards
    });
  }

  render() {
    const { cards, isLoading, usersGroup, usersID } = this.state;
    console.log(cards);
    return isLoading ? (
      <img
        src="https://image.flaticon.com/icons/svg/25/25220.svg"
        className="rotate"
        alt="page is loading"
      />
    ) : (
      <div className="dashboard community">
        <div className="cont">
          <h1>Community</h1>
          <AddAnnouncement
            usersGroup={usersGroup}
            usersID={usersID}
            updateCards={this.addTempCard}
          />
          <AnnouncementList announcements={cards} />
        </div>
      </div>
    );
  }
}
