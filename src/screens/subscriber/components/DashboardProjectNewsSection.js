import React from 'react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../components/LoadingComponent';
import RightArrow from '../../../assets/right_arrow.png';

export default class DashboardProjectNewsSection extends React.PureComponent {
  render() {
    const { announcements, isLoadingAnnouncements } = this.props;
    return (
      <div className="subscriber-side-container">
        <div className="subscriber-section-header">
          <div className="subscriber-header">Project News</div>
          <Link to="/projectnews">
            <img src={RightArrow} alt="right arrow" />
          </Link>
        </div>
        <div className="subscriber-side-section-body">
          {isLoadingAnnouncements ? (
            <LoadingComponent />
          ) : (
            announcements.map(announcement => {
              const { title, message, attachments } = announcement;

              let url = '';
              let filename = '';
              if (attachments) {
                url = attachments[0].url;
                filename = attachments[0].filename;
              }

              return (
                <div key={title} className="subscriber-news-card">
                  <div className="cardHeading">
                    <h3>{title}</h3>
                    {url ? <img src={url} alt={filename} /> : null}
                    <p>{message}</p>
                  </div>
                  <div className="cardDetails" />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
