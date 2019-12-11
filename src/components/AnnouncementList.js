import React from 'react';
import '../styles/Community.css';

const AnnouncementList = props => {
  const { announcements, css } = props;
  const list = announcements.map(announce => {
    // console.log(announce);
    const {
      Title: title,
      Message: message,
      // Time: time,
      // Location: location,
      // 'Event type': eventType,
      Attachments: attachments
    } = announce.fields;

    let url = '';
    let filename = '';
    if (attachments) {
      url = attachments[0].url;
      filename = attachments[0].filename;
    }

    return (
      <div key={title} className="announcementCard">
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
    <div className={css.concat(' ', 'cardsCont')} style={{ overflow: 'auto' }}>
      {list}
    </div>
  );
};

export default AnnouncementList;
