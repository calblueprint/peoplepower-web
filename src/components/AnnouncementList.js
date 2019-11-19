import React from 'react';
import '../styles/Community.css';

const AnnouncementList = props => {
  const { announcements } = props;
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

    // const eventDetails = (
    //   <div>
    //     <div className="cardTime">
    //       <h3>Time</h3>
    //       <p>{time}</p>
    //     </div>
    //     <div className="cardLocation">
    //       <h3>Location</h3>
    //       <p>{location}</p>
    //     </div>
    //   </div>
    // );

    /* Awaiting Iris' input on whether card details (time and location)
       will remain on the cards.

      This would go inside of div.cardDetails:
      
        {eventType === 'Event' ? eventDetails : null}
    */

    return (
      <div key={message} className="card">
        <div className="cardHeading">
          <h2>{title}</h2>
          <p>{url ? <img src={url} alt={filename} /> : null}</p>
          <p>{message}</p>
        </div>
        <div className="cardDetails" />
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
