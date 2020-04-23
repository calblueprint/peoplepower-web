import React from 'react';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { isAdmin } from '../../lib/credentials';
import AnnouncementList from './components/AnnouncementList';
import AddAnnouncement from './components/AddAnnouncement';
import '../../styles/Community.css';
import NoProjects from './components/NoProjects';

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: ''
    };
  }

  render() {
    const {
      announcements,

      owner,
      credentials
    } = this.props;

    let body;
    if (announcements.length === 0) {
      body = <NoProjects />;
    } else {
      return (
        <div className="dashboard community">
          <div className="cont">
            <h1>Project News</h1>
            {isAdmin(credentials) ? <AddAnnouncement owner={owner} /> : null}
            <AnnouncementList
              announcements={[...announcements].reverse()}
              css={isAdmin(credentials) ? '' : 'non-admin-height'}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="cont">
        <div className="ppsc-coomunity-center">
          <h1 className="project-news-header">Project News</h1>
          {body}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  credentials: state.userData.credentials,
  announcements: state.community.announcements
});
export default connect(mapStateToProps)(Community);
