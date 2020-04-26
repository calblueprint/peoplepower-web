import React from 'react';
import '../../../styles/Community.css';

const AnnouncementList = props => {
  const { announcements, css, isFull } = props;
  const list = [...announcements].reverse().map(announcement => {
    const { id, title, message, attachments } = announcement;

    let url = '';
    let filename = '';
    if (attachments) {
      url = attachments[0].url;
      filename = attachments[0].filename;
    }

    return (
      <div
        key={id}
        className={`announcement-card ${
          isFull ? 'announcement-full-screen' : ''
        }`}
      >
        <div>
          <h2>{title}</h2>
          {url ? (
            <img src={url} alt={filename} className="announcement-image" />
          ) : null}
          <p>{message}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={(css || '').concat(' ', 'cardsCont')}>
      {[
        list[list.length],
        list[list.length - 1],
        list[list.length - 2],
        list[list.length - 3],
        list[list.length - 4]
      ]}
    </div>
  );
};

export default AnnouncementList;
