import React from 'react';
import { connect } from 'react-redux';
import DashboardBilling from './components/DashboardBilling';
import DashboardCharts from './components/DashboardCharts';
import DashboardProjectNews from './components/DashboardProjectNews';
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
    const { owner } = this.props;

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
            <DashboardBilling
              activeBill={activeBill}
              transactions={transactions}
            />
          </div>
          <div className="subscriber-section">
            <DashboardCharts hasShares={owner.numberOfShares !== 0} />
          </div>
        </div>
        <div className="subscriber-side">
          <DashboardProjectNews
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
  announcements: state.community.announcements
});

export default connect(mapStateToProps)(SubscriberDashboard);
