import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { connect } from 'react-redux';
import '../../styles/Investments.css';
import GreenCheck from '../../assets/green_check.png';
import RedX from '../../assets/red_x.png';

class Investment extends React.PureComponent {
  render() {
    const { owner } = this.props;
    const percentage = owner.numberOfShares * 10;
    return (
      <div className="dashboard">
        <div className="mainheader">
          <h1>My Investment</h1>
          <div className="columnformat">
            <div className="left-content">
              <h2>My Investment</h2>
              <div className="investment-box-1">
                <div className="circle-progress-bar">
                  <CircularProgressbar
                    viewBox="0 0 0 0"
                    value={percentage}
                    text={owner.numberOfShares}
                    styles={buildStyles({
                      pathColor: '#cd6795',
                      textSize: '30px',
                      textColor: '#cd6795',
                      trailColor: '#F4F1F24'
                    })}
                  />
                </div>
                <div className="box-text">
                  <p>
                    You currently own {owner.numberOfShares} out of 10 possible
                    shares
                    <br />
                    <h4>${owner.numberOfShares * 100}.00</h4>
                  </p>
                </div>
                <div className="buttons">
                  <div className="buy-shares-button">
                    <a className="button" href="/investment">
                      <span>Buy Shares</span>
                    </a>
                  </div>
                  <div className="dividend">Divest</div>
                </div>
              </div>
              <div className="investment-box-2">
                <div className="preferences">
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
                <div className="dividends-button">
                  <a className="change-button" href="/investment">
                    <span>Change</span>
                  </a>
                </div>
              </div>
              <h2>Transactions</h2>
              <div className="transactions-box">transactions box test</div>
            </div>
            <div className="right-content">
              <h2>Financial Breakdown</h2>
              <div className="fin-box">fin box test</div>
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
