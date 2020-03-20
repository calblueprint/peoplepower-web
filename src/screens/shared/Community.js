import React from 'react';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { isAdmin } from '../../lib/credentials';
import AnnouncementList from './components/AnnouncementList';
import AddAnnouncement from './components/AddAnnouncement';
import LoadingComponent from '../../components/LoadingComponent';
import '../../styles/Community.css';
import PPSCBanner from '../../assets/ppsc-banner.svg';

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
      isLoadingAnnouncements,
      isLoadingUserData,
      owner,
      credentials
    } = this.props;

    const isLoading = isLoadingAnnouncements || isLoadingUserData;
    if (isLoading) {
      return <LoadingComponent />;
    }
    if (announcements.length === 0) {
      return (
        <div className="cont">
          <div className="ppsc-coomunity-center">
            <h1 className="project-news-header">Project News</h1>
            <img
              src={PPSCBanner}
              alt="People Power Solar Cooperation Banner"
              className="ppsc-banner"
            />
            <h3 className="ppsc-community-h3">No project news</h3>
            <div className="ppsc-community-body">
              Looks like there’s no project news available right now. Check back
              later!
            </div>
          </div>
        </div>
      );
    }
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
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  credentials: state.userData.credentials,
  announcements: state.community.announcements,
  isLoadingUserData: state.userData.isLoading,
  isLoadingAnnouncements: state.community.isLoading
});
export default connect(mapStateToProps)(Community);
