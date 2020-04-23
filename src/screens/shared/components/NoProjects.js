import React from 'react';
import '../../../styles/Community.css';
import PPSCNoAnnouncementsGraphic from '../../../assets/ppsc-banner.svg';

export default function NoProjects() {
  return (
    <div className="ppsc-coomunity-center">
      <img
        src={PPSCNoAnnouncementsGraphic}
        alt="People Power Solar Cooperation Banner"
        className="no-announcements"
      />
      <h3 className="ppsc-community-h3">No project news</h3>
      <div className="ppsc-community-body">
        Looks like there’s no project news available right now. Check back
        later!
      </div>
    </div>
  );
}
