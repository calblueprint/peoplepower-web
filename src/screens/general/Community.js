import React from 'react';
import '../../styles/Community.css';
import {
  getAnnouncementsForProjectGroup,
  getPersonById,
  getOwnerById
} from '../../lib/request';
import { getLoggedInUserId } from '../../lib/auth';
import { applyCredentials, isAdmin } from '../../lib/credentials';
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
        return getAnnouncementsForProjectGroup(projectGroup[0]);
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
          {isAdmin(credentials) ? (
            <AddAnnouncement
              usersGroup={usersGroup}
              usersID={usersID}
              updateCards={this.addTempCard}
            />
          ) : null}
          <AnnouncementList
            announcements={cards}
            css={isAdmin(credentials) ? '' : 'nonAdminHeight'}
          />
        </div>
      </div>
    );
  }
}
