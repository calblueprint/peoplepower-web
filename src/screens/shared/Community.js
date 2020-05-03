import React from 'react';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { isAdmin, getCredentials } from '../../lib/credentials';
import AnnouncementList from './components/AnnouncementList';
import AddAnnouncement from './components/AddAnnouncement';
import '../../styles/Community.css';
import NoProjects from './components/NoProjects';

class Community extends React.PureComponent {
  render() {
    const { announcements, owner } = this.props;
    const credentials = getCredentials(owner);

    let body;
    if (announcements.length === 0) {
      body = <NoProjects />;
    } else {
      return (
        <div className="community">
          <div className="cont">
            <h1>Project News</h1>
            {isAdmin(credentials) ? <AddAnnouncement owner={owner} /> : null}
            <AnnouncementList
              announcements={announcements}
              css={isAdmin(credentials) ? '' : 'non-admin-height'}
              limitWidth
            />
          </div>
        </div>
      );
    }
    return (
      <div className="project-news-dashboard">
        <div className="cont">
          <div className="ppsc-coomunity-center">
            <h1 className="project-news-header">Project News</h1>
            {body}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  announcements: state.community.announcements
});
export default connect(mapStateToProps)(Community);
