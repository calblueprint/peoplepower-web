import React from 'react';
import '../../styles/Community.css';
import { getRecord, getMultipleFromAttr } from '../../lib/request';
import { getLoggedInUserId } from '../../lib/auth';
import AnnouncementList from '../../components/AnnouncementList';

export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          ID: 'abc',
          Title: 'Nick puts a single solar panel on his roof',
          Location: '2610 Haste Street',
          Author: 'Nick Wong',
          Message:
            'Yes. It has happened. Nick put A SINGLE PANEL on his roof. Fiat Lux.',
          Time: 'Monday, Nov 7 12:00PM'
        },
        {
          ID: 'cba',
          Title: 'Party with Fang',
          Location: 'Le Conte Hall',
          Author: 'Fang',
          Message: "It's time to get PPPOWER LIT with Fang",
          Time: 'Monday, Nov 7 12:00PM'
        }
      ]
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
        console.log(payload);
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
