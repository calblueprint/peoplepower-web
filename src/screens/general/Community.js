import React from 'react';
import 'react-table-v6/react-table.css';
import '../../styles/Community.css';
import {
  getAnnouncementsByProjectGroup,
  getPersonById,
  getOwnerById
} from '../../lib/request';
import { getLoggedInUserId, getLoggedInUserName } from '../../lib/auth';
import { applyCredentials, isAdmin } from '../../lib/credentials';
import AnnouncementList from '../../components/AnnouncementList';
import AddAnnouncement from '../../components/AddAnnouncement';
import LoadingComponent from '../../components/LoadingComponent';
import { Columns } from '../../lib/schema';

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
  }

  async componentDidMount() {
    const { history } = this.props;
    const personId = getLoggedInUserId();
    if (!personId) {
      history.push('/');
      return;
    }
    this.setState({
      usersID: personId
    });

    const personRecord = await getPersonById(personId);
    const ownerId = personRecord[Columns.Person.Owner];
    const ownerRecord = await getOwnerById(ownerId);
    const projectGroupId = ownerRecord[Columns.Owner.ProjectGroup][0];
    const announcements = await getAnnouncementsByProjectGroup(projectGroupId);

    const credentials = await applyCredentials(personId);

    this.setState({
      usersGroup: projectGroupId,
      cards: announcements,
      credentials,
      isLoading: false
    });

    const { updateState } = this.props;
    const name = getLoggedInUserName();
    updateState(personId, name);
  }

  addTempCard = announcement => {
    const { cards } = this.state;
    const updatedCards = [announcement, ...cards];
    this.setState({
      cards: updatedCards
    });
  };

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
