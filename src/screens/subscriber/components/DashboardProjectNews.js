import React from 'react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../components/LoadingComponent';
import RightArrow from '../../../assets/right_arrow.png';
import NoProjects from '../../shared/components/NoProjects';

export default class DashboardProjectNewsSection extends React.PureComponent {
  render() {
    let { announcements } = this.props;
    const { isLoadingAnnouncements } = this.props;
    announcements = [...announcements].reverse();
    let renderedComponent = <NoProjects />;
    if (isLoadingAnnouncements || !announcements) {
      renderedComponent = <LoadingComponent />;
    } else if (announcements.length === 0) {
      renderedComponent = <NoProjects />;
    } else {
      renderedComponent = announcements.map(announcement => (
        <div key={announcement.title} className="subscriber-news-card">
          <div>
            <h3>{announcement.title}</h3>
            {announcement.attachments
              ? announcement.attachments.map(attachment => (
                  <img src={attachment.url} alt={attachment.filename} />
                ))
              : null}
            <p>{announcement.message}</p>
          </div>
        </div>
      ));
    }

    return (
      <div className="subscriber-side-container">
        <div className="subscriber-section-header">
          <div className="subscriber-header">Project News</div>
          <Link to="/projectnews">
            <img
              src={RightArrow}
              className="button right-arrow-button"
              alt="right arrow"
            />
          </Link>
        </div>
        <div className="subscriber-side-section-body">{renderedComponent}</div>
      </div>
    );
  }
}
