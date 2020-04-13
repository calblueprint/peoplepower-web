import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SharesProgressBar from './components/SharesProgressBar';
import DividendsPreferencesModal from './components/DividendsPreferencesModal';
import { updateOwner, getPaymentsByIds } from '../../lib/airtable/request';
import { refreshUserData } from '../../lib/userDataUtils';
import '../../styles/Investments.css';
import GreenCheck from '../../assets/green_check.png';
import RedX from '../../assets/red_x.png';
import TransactionList from './components/TransactionsList';
import Constants from '../../constants';

const { MAX_SHARES, SHARE_PRICE } = Constants;

class Investment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isReceivingDividends: true,
      payments: []
    };
  }

  componentDidMount() {
    const { isLoadingUserData } = this.props;
    if (isLoadingUserData) {
      return; // Data isn't loaded in yet
    }
    this.getPayments();
    this.refreshState();
  }

  // This function gets called whenever the component receives new props or new state
  componentDidUpdate = prevProps => {
    const { owner } = this.props;
    if (prevProps.owner !== owner) {
      this.refreshState();
    }
  };

  refreshState = () => {
    const { owner } = this.props;
    this.setState({ isReceivingDividends: owner.isReceivingDividends });
  };

  submitPreference = async newIsReceivingDividends => {
    const { owner } = this.props;
    await updateOwner(owner.id, {
      isReceivingDividends: newIsReceivingDividends
    });
    await refreshUserData(owner.id);
  };

  getPayments = async () => {
    const { owner } = this.props;
    let paymentsList = [];
    paymentsList = await getPaymentsByIds(owner.paymentIds || []);
    this.setState({ payments: paymentsList });
  };

  render() {
    const { owner } = this.props;
    const { isReceivingDividends, payments } = this.state;

    return (
      <div className="dashboard">
        <div className="mainheader">
          <h1>My Investment</h1>
          <div className="columnformat">
            <div className="investment-and-transactions-content">
              <h2>My Investment</h2>
              <div className="investments-box-shares">
                <div className="investments-circle-progress-bar">
                  <SharesProgressBar numberOfShares={owner.numberOfShares} />
                </div>
                <div className="box-text">
                  <h5>
                    You currently own {owner.numberOfShares} out of 10 possible
                    shares
                  </h5>
                  <br />
                  <h4>${owner.numberOfShares * SHARE_PRICE}.00</h4>
                </div>
                <div className="investments-buttons">
                  {owner.numberOfShares !== MAX_SHARES && (
                    <div className="investments-buy-shares-button">
                      <Link to="/buyshares">Buy Shares</Link>
                    </div>
                  )}

                  <div className="investments-dividend">Divest</div>
                </div>
              </div>
              <div className="investments-box-dividends">
                <div className="dividends-preferences-box">
                  <h4>Dividend Preferences</h4>
                  <div className="status">
                    <img
                      className="green-check"
                      src={
                        owner.isReceivingDividends === true ? GreenCheck : RedX
                      }
                      alt={
                        owner.isReceivingDividends === true
                          ? 'Green Check'
                          : 'Red X'
                      }
                    />
                    <span>
                      {owner.isReceivingDividends === true ? (
                        <h6>Currently receiving dividends</h6>
                      ) : (
                        <h6>Not receiving dividends</h6>
                      )}
                    </span>
                  </div>
                </div>
                <DividendsPreferencesModal
                  newIsReceivingDividends={isReceivingDividends}
                  onClickSavePreferences={this.submitPreference}
                />
              </div>
              <h2>Transactions</h2>
              <div className="transactions-box">
                <TransactionList payments={payments} />
              </div>
            </div>
            <div className="right-content">
              <h2>Financial Breakdown</h2>
              <div className="fin-box" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner
});

export default connect(mapStateToProps)(Investment);
