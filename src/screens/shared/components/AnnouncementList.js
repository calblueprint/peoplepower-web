import React from 'react';
import '../../../styles/Community.css';

const AnnouncementList = props => {
  const { announcements, css } = props;
  const list = announcements.map(announcement => {
    const { id, title, message, attachments } = announcement;

    let url = '';
    let filename = '';
    if (attachments) {
      url = attachments[0].url;
      filename = attachments[0].filename;
    }

    return (
      <div key={id} className="announcement-card">
        <div className="cardHeading">
          <h2>{title}</h2>
          {url ? <img src={url} alt={filename} /> : null}
          <p>{message}</p>
        </div>
        <div className="cardDetails" />
      </div>
    );
  });

  return (
    <div
      className={(css || '').concat(' ', 'cardsCont')}
      style={{ overflow: 'auto' }}
    >
      {list}
    </div>
  );
};

export default AnnouncementList;
