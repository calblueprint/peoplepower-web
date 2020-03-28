import React from 'react';
import { connect } from 'react-redux';
import DashboardBillingSection from './components/DashboardBillingSection';
import DashboardChartsSection from './components/DashboardChartsSection';
import DashboardProjectNewsSection from './components/DashboardProjectNewsSection';
import '../../styles/SubscriberDashboard.css';
import '../../styles/Community.css';
import { getSubscriberTransactionData } from '../../lib/subscriberUtils';

class SubscriberDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      activeBill: null,
      mode: 0
    };
  }

  async componentDidMount() {
    const { owner, isLoadingUserData } = this.props;

    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    const { activeBill, transactions } = await getSubscriberTransactionData(
      owner
    );

    this.setState({ activeBill, transactions });
  }

  seeAllBills() {
    this.setState({
      mode: 1
    });
  }

  render() {
    const { owner, announcements, isLoadingAnnouncements } = this.props;
    const { activeBill, transactions } = this.state;

    return (
      <div className="subscriber-page ">
        <div className="subscriber-main">
          <div className="subscriber-section">
            <DashboardBillingSection
              activeBill={activeBill}
              transactions={transactions}
            />
          </div>
          <div className="subscriber-section">
            <DashboardChartsSection hasShares={owner.numberOfShares !== 0} />
          </div>
        </div>
        <div className="subscriber-side">
          <DashboardProjectNewsSection
            announcements={announcements}
            isLoadingAnnouncements={isLoadingAnnouncements}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  projectGroup: state.userData.projectGroup,
  solarProjects: state.userData.solarProjects,
  announcements: state.community.announcements,
  isLoadingUserData: state.userData.isLoading,
  isLoadingAnnouncements: state.community.isLoading
});

export default connect(mapStateToProps)(SubscriberDashboard);
