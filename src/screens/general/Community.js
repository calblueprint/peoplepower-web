import React from 'react';
import '../../styles/Community.css';
import {
  getAnnouncementsFromProjectGroup,
  getPersonById,
  getOwnerById
} from '../../lib/request';
import { getLoggedInUserId } from '../../lib/auth';
import applyCredentials from '../../lib/credentials';
import AnnouncementList from '../../components/AnnouncementList';
import AddAnnouncement from '../../components/AddAnnouncement';
import LoadingComponent from '../../components/LoadingComponent';

export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      usersID: '',
      usersGroup: '',
      credentials: '',
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

    getPersonById(id)
      .then(payload => {
        const { Owner: owner } = payload;
        return getOwnerById(owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroup } = payload;
        this.setState({
          usersGroup: projectGroup[0]
        });
        return getAnnouncementsFromProjectGroup(projectGroup[0]);
      })
      .then(payload => {
        this.setState({
          cards: payload,
          isLoading: false
        });
      });

    applyCredentials(id).then(credentials => {
      this.setState({
        credentials
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
    const { cards, isLoading, usersGroup, usersID, credentials } = this.state;
    return isLoading ? (
      <LoadingComponent />
    ) : (
      <div className="dashboard community">
        <div className="cont">
          <h1>Community</h1>
          {credentials.includes('A') ? (
            <AddAnnouncement
              usersGroup={usersGroup}
              usersID={usersID}
              updateCards={this.addTempCard}
            />
          ) : null}
          <AnnouncementList
            announcements={cards}
            css={credentials.includes('A') ? '' : 'nonAdminHeight'}
          />
        </div>
      </div>
    );
  }
}
