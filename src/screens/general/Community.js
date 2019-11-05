import React from 'react';
import '../../styles/Community.css';
import { getRecord, getMultipleFromAttr } from '../../lib/request';
import { getLoggedInUserId } from '../../lib/auth';
import AnnouncementList from '../../components/AnnouncementList';

export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      history.push('/');
      return;
    }

    getRecord('Person', id)
      .then(payload => {
        const { Owner: owner } = payload.record;
        return getRecord('Owner', owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroup } = payload.record;
        return getMultipleFromAttr(
          'Announcement',
          'Project Group',
          `${projectGroup[0]}`
        );
      })
      .then(payload => {
        this.setState({
          cards: payload
        });
      });
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="communityCont">
        <h1>Community</h1>
        <AnnouncementList announcements={cards} />
      </div>
    );
  }
}
