import React from 'react';
import '../styles/Community.css';

const AnnouncementList = props => {
  const { announcements } = props;
  const list = announcements.map(announce => {
    console.log(announce);
    const {
      Title: title,
      Message: message,
      Time: time,
      Location: location,
      'Event type': eventType
    } = announce.fields;

    const eventDetails = (
      <div>
        <div className="cardTime">
          <h3>Time</h3>
          <p>{time}</p>
        </div>
        <div className="cardLocation">
          <h3>Location</h3>
          <p>{location}</p>
        </div>
      </div>
    );

    return (
      <div key={message} className="card">
        <div className="cardHeading">
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
        <div className="cardDetails">
          {eventType === 'Event' ? eventDetails : null}
        </div>
      </div>
    );
  });

  return (
    <div className="cardsCont" style={{ overflow: 'auto' }}>
      {list}
    </div>
  );
};

export default AnnouncementList;
