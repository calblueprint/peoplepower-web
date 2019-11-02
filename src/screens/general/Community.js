import React from 'react';
import '../../styles/Community.css';
import { getRecord, getRecordFromAttribute } from '../../lib/request';
import { getLoggedInUserId } from '../../lib/auth';

export default class Community extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
      return;
    }

    getRecord('Person', id)
      .then(payload => {
        // use array deconstructing
        const { 'Project Group': projectGroup } = payload.record;

        return getRecordFromAttribute(
          'Announcement',
          'Project Group',
          projectGroup
        );
      })
      .then(payload => {
        console.log(`PAYLOAD: ${  payload}`);
      });
  }

  render() {
    return (
      <div className="communityCont">
        <h2>Community</h2>
      </div>
    );
  }
}
