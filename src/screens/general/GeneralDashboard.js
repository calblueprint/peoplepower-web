import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AnnouncementList from '../shared/components/AnnouncementList';
import InvestmentCard from '../shared/components/InvestmentCard';
import '../../styles/GeneralOwnerDashboard.css';
import RightArrow from '../../assets/right_arrow.png';
import ProductionChart from '../../components/ProductionChartGeneral';
import NoProjects from '../shared/components/NoProjects';

class GeneralOwnerDashboard extends React.PureComponent {
  /* dash-solar-details will eventually be its own graph component
     so it'll be easy to write a ternary operator that will render
     it when it's loaded.
  */
  render() {
    const { announcements, owner } = this.props;
    return (
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="dash-announcements-cont">
            <div className="header-button">
              <div className="header-only">
                <h3>Project News</h3>
              </div>
              <div className="right-button">
                <Link to="/projectnews">
                  <img
                    className="button right-arrow-button"
                    src={RightArrow}
                    alt="right arrow"
                  />
                </Link>
              </div>
            </div>

            {announcements.length > 0 ? (
              <AnnouncementList
                announcements={announcements}
                css="non-admin-height"
              />
            ) : (
              <NoProjects />
            )}
          </div>
          <div>
            <div className="general-dashboard-right-content">
              <div className="dash-solar-details-cont">
                <h3>Solar Projects</h3>
                <div className="dash-solar-details">
                  <ProductionChart
                    data={[
                      { month: 'Jan', production: 270 },
                      { month: 'Feb', production: 326 },
                      { month: 'Mar', production: 500 },
                      { month: 'Apr', production: 590 },
                      { month: 'May', production: 580 },
                      { month: 'Jun', production: 620 }
                    ]}
                  />
                </div>
              </div>

              <div className="dash-investment-cont">
                <div className="header-button">
                  <div className="dashboard-investment-header">
                    <h3>My Investment</h3>
                  </div>
                  <div className="right-button">
                    <Link to="/investment">
                      <img
                        className="button right-arrow-button"
                        src={RightArrow}
                        alt="right arrow"
                      />
                    </Link>
                  </div>
                </div>
                <InvestmentCard numberOfShares={owner.numberOfShares} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  projectGroup: state.userData.projectGroup,
  solarProjects: state.userData.solarProjects,
  announcements: state.community.announcements
});

export default connect(mapStateToProps)(GeneralOwnerDashboard);
