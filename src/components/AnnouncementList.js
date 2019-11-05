import React from 'react';
import '../styles/Community.css';

const AnnouncementList = props => {
  const list = props.announcements.map(announce => {
    const {
      ID: id,
      Title: title,
      Message: message,
      Time: time,
      Location: location
    } = announce.fields;
    return (
      <div key={id} className="card">
        <div className="cardHeading">
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
        <div className="cardDetails">
          <div className="cardTime">
            <h3>Time</h3>
            <p>{time}</p>
          </div>
          <div className="cardLocation">
            <h3>Location</h3>
            <p>{location}</p>
          </div>
        </div>
      </div>
    );
  });

  return <div className="cardsCont">{list}</div>;
};

export default AnnouncementList;
