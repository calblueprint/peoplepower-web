import React from 'react';
import { connect } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import AnnouncementList from '../shared/components/AnnouncementList';
import '../../styles/SubscriberDashboard.css';
import RightArrow from '../../assets/right_arrow.png';
import { isAdmin } from '../../lib/credentials';
import '../../styles/Community.css';
import LoadingComponent from '../../components/LoadingComponent';
import {
  areDiffBills,
  getSubscriberBills,
  centsToDollars
} from '../../lib/subscriberUtils';
import '../../styles/SubscriberOwnerDashboard.css';
import { getTotalBalanceFromBills } from '../../lib/paypalUtils';

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
class SubscriberDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: '',
      transactions: [],
      pendingBills: [],
      mode: 0,
      isReady: false
    };
  }

  async componentDidMount() {
    const { owner, isLoadingUserData } = this.props;

    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    const { transactions, pendingBills } = await getSubscriberBills(owner);

    if (transactions) {
      this.setState(prevState => {
        if (areDiffBills(prevState.transactions, transactions)) {
          return {
            transactions,
            pendingBills,
            isReady: true
          };
        }
        return { isReady: true };
      });
    }
  }

  seeAllBills() {
    this.setState({
      mode: 1
    });
  }

  seeMain() {
    this.setState({
      mode: 0
    });
  }

  render() {
    const { announcements, credentials } = this.props;
    const { isLoading, pendingBills } = this.state;
    const totalBalance = getTotalBalanceFromBills(pendingBills);

    return (
      <div className="subscriber-page ">
        <div className="subscriber-main">
          <div className="subscriber-section">
            <div className="subscriber-section-header">
              <div className="subscriber-header">Billing Summary</div>
              <button type="button">
                <img src={RightArrow} alt="right arrow" />
              </button>
            </div>
            <div className="subscriber-section-body">
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <div>
                  <div>
                    <div>
                      Current Balance
                      {centsToDollars(totalBalance)}
                      <div className="subscriber-dashboard-paypal-component">
                        {totalBalance === 0 ? null : (
                          <PayPalButton
                            amount={centsToDollars(totalBalance)}
                            onSuccess={this.onPaypalPaymentSuccess}
                            options={{
                              clientId
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="subscriber-section">
            <div className="subscriber-section-header">
              <div className="subscriber-header">My Solar Project</div>
              <button type="button">
                <img src={RightArrow} alt="right arrow" />
              </button>
            </div>
            <div className="subscriber-section-body">Very nice graphs</div>
          </div>
        </div>
        <div className="subscriber-side">
          <div className="subscriber-section">
            <div className="subscriber-section-header">
              <div className="subscriber-header">Community</div>
              <button type="button">
                <img src={RightArrow} alt="right arrow" />
              </button>
            </div>
            <div className="subscriber-section-body">
              <div className="cont">
                <AnnouncementList
                  announcements={[...announcements].reverse()}
                  css={isAdmin(credentials) ? '' : 'non-admin-height'}
                />
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
  announcements: state.community.announcements,
  isLoadingUserData: state.userData.isLoading,
  isLoadingAnnouncements: state.community.isLoading,
  credentials: state.userData.credentials
});

export default connect(mapStateToProps)(SubscriberDashboard);
