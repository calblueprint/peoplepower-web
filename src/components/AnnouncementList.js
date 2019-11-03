import React from 'react';
import '../styles/Community.css';

const AnnouncementList = announcements => {
  const list = announcements.announcements.map(announce => {
    return (
      <div key={announce.ID} className="card">
        <div className="cardHeading">
          <h1>{announce.Title}</h1>
          <p>{announce.Message}</p>
        </div>
        <div className="cardDetails">
          <div className="cardTime">
            <h3>Time</h3>
            <p>{announce.Time}</p>
          </div>
          <div className="cardLocation">
            <h3>Location</h3>
            <p>{announce.Location}</p>
          </div>
        </div>
      </div>
    );
  });

  return <div className="cardsCont">{list}</div>;
};

export default AnnouncementList;
