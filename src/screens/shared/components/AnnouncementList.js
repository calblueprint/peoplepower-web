import React from 'react';
import '../../../styles/Community.css';
import PPSCBanner from '../../../assets/ppsc-banner.svg';

export function NoProjects() {
  return (
    <div className="ppsc-coomunity-center">
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
  );
}

const AnnouncementList = props => {
  const { announcements, css } = props;
  const list = announcements.map(announcement => {
    const { title, message, attachments } = announcement;

    let url = '';
    let filename = '';
    if (attachments) {
      url = attachments[0].url;
      filename = attachments[0].filename;
    }

    return (
      <div key={title} className="announcement-card">
        <div className="cardHeading">
          <h2>{title}</h2>
          {url ? <img src={url} alt={filename} /> : null}
          <p>{message}</p>
        </div>
        <div className="cardDetails" />
      </div>
    );
  });

  if (announcements.length === 0) {
    return (
      <div className="announcement-card">
        <NoProjects />
      </div>
    );
  }
  return (
    <div className={css.concat(' ', 'cardsCont')} style={{ overflow: 'auto' }}>
      {list}
    </div>
  );
};

export default AnnouncementList;
