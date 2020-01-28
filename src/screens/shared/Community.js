import React from 'react';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { isAdmin } from '../../lib/credentials';
import AnnouncementList from './components/AnnouncementList';
import AddAnnouncement from './components/AddAnnouncement';
import LoadingComponent from '../../components/LoadingComponent';
import '../../styles/Community.css';

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: ''
    };
  }

  addTempCard = announcement => {
    const { cards } = this.state;
    const updatedCards = [announcement, ...cards];
    this.setState({
      cards: updatedCards
    });
  };

  render() {
    const {
      announcements,
      isLoadingAnnouncements,
      isLoadingUserData,
      owner,
      credentials
    } = this.props;

    const isLoading = isLoadingAnnouncements || isLoadingUserData;
    return isLoading ? (
      <LoadingComponent />
    ) : (
      <div className="dashboard community">
        <div className="cont">
          <h1>Community</h1>
          {isAdmin(credentials) ? (
            <AddAnnouncement
              projectGroupId={owner.projectGroup}
              personId={owner.person}
              updateCards={this.addTempCard}
            />
          ) : null}
          <AnnouncementList
            announcements={announcements}
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
