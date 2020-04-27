import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { connect } from 'react-redux';
import InvestmentsPieGraph from './components/InvestmentsPieGraph';
import DividendsPreferencesModal from './components/DividendsPreferencesModal';
import {
  updateOwner,
  getPaymentsByIds,
  getAllInvestmentBreakdowns
} from '../../lib/airtable/request';
import { refreshUserData } from '../../lib/userDataUtils';
import '../../styles/Investments.css';
import GreenCheck from '../../assets/green_check.png';
import RedX from '../../assets/red_x.png';
import TransactionList from './components/TransactionsList';
import InvestmentCard from '../shared/components/InvestmentCard';

class Investment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isReceivingDividends: true,
      payments: [],
      investmentBreakdowns: []
    };
  }

  componentDidMount() {
    const { isLoadingUserData } = this.props;
    if (isLoadingUserData) {
      return; // Data isn't loaded in yet
    }
    this.refreshState();
  }

  // This function gets called whenever the component receives new props or new state
  componentDidUpdate = prevProps => {
    const { owner } = this.props;
    if (prevProps.owner !== owner) {
      this.refreshState();
    }
  };

  refreshState = async () => {
    const { owner } = this.props;
    const investmentBreakdowns = await getAllInvestmentBreakdowns();
    this.setState({
      isReceivingDividends: owner.isReceivingDividends,
      investmentBreakdowns
    });
    this.getPayments();
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
    const { isReceivingDividends, payments, investmentBreakdowns } = this.state;

    return (
      <div className="dashboard">
        <div className="investment-margin">
          <div className="my-investment-dashboard">
            <div className="investment-mainheader">
              <h1>My Investment</h1>
              <div className="investments-column-format">
                <div>
                  <h2>My Investment</h2>
                  <div className="investments-shares-box-container">
                    <InvestmentCard numberOfShares={owner.numberOfShares} />
                  </div>
                  <div className="investments-box-dividends investments-financial-breakdown-box">
                    <div className="investments-dividends-preferences-box">
                      <h4>Dividend Preferences</h4>
                      <div className="investment-dividends-status">
                        <img
                          className="investments-green-check"
                          src={
                            owner.isReceivingDividends === true
                              ? GreenCheck
                              : RedX
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
                  <div className="investments-transactions-box">
                    <TransactionList payments={payments} />
                  </div>
                </div>
                <div className="investment-right-content">
                  <h2>Financial Breakdown</h2>
                  <div className="investments-financial-breakdown-box">
                    <div className="investment-pie-graph">
                      <div className="investment-financial-breakdown-graph-caption">
                        <p>
                          Here&apos;s how your money and others&apos; is going
                          towards helping the project group and cooperative:
                        </p>
                      </div>
                      <InvestmentsPieGraph
                        investmentBreakdowns={investmentBreakdowns}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
