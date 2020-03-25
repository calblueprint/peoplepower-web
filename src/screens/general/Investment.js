import React from 'react';
import Modal from 'react-modal';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { connect } from 'react-redux';
import { updateOwner } from '../../lib/airtable/request';
import { refreshUserData } from '../../lib/userDataUtils';
import '../../styles/Investments.css';
import GreenCheck from '../../assets/green_check.png';
import RedX from '../../assets/red_x.png';

class Investment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      newIsReceivingDividends: props.owner.isReceivingDividends
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  submitPreference = async newIsReceivingDividends => {
    const { owner } = this.props;
    await updateOwner(owner.id, newIsReceivingDividends);
    await refreshUserData(owner.id, owner.isReceivingDividends);
  };

  onSavePreferencesPressed = async () => {
    const { newIsReceivingDividends } = this.state;
    await this.submitPreference({
      isReceivingDividends: newIsReceivingDividends
    });
  };

  onClickSavePreferences = async () => {
    await this.onSavePreferencesPressed();
    this.handleCloseModal();
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleCheckYes() {
    this.setState({ newIsReceivingDividends: true });
  }

  handleCheckNo() {
    this.setState({ newIsReceivingDividends: false });
  }

  render() {
    const { owner } = this.props;
    const { showModal, newIsReceivingDividends } = this.state;
    const percentage = owner.numberOfShares * 10;
    const progressbarPink = '#cd6795';
    const progressbarGray = '#F4F1F24';
    const progressbarText = '30px';

    const circularProgressBarStyles = {
      pathColor: progressbarPink,
      textSize: progressbarText,
      textColor: progressbarPink,
      trailColor: progressbarGray
    };

    return (
      <div className="dashboard">
        <div className="mainheader">
          <h1>My Investment</h1>
          <div className="columnformat">
            <div className="investment-and-transactions-content">
              <h2>My Investment</h2>
              <div className="investments-box-shares">
                <div className="circle-progress-bar">
                  <CircularProgressbar
                    viewBox="0 0 0 0"
                    value={percentage}
                    text={owner.numberOfShares}
                    styles={buildStyles(circularProgressBarStyles)}
                  />
                </div>
                <div className="box-text">
                  <h5>
                    You currently own {owner.numberOfShares} out of 10 possible
                    shares
                    <br />
                    <h4>${owner.numberOfShares * 100}.00</h4>
                  </h5>
                </div>
                <div className="investments-buttons">
                  <div className="investments-buy-shares-button">
                    <a className="button" href="/investment">
                      <span>Buy Shares</span>
                    </a>
                  </div>
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
                <div className="dividends-button">
                  <button
                    type="button"
                    className="change-button"
                    onClick={this.handleOpenModal}
                  >
                    Change
                  </button>
                  <Modal
                    isOpen={showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="dividends-modal"
                    overlayClassName="admin-modal-overlay"
                  >
                    <div className="dividends-modal-content">
                      <h3>Dividend Preferences</h3>
                      <h4>
                        We aim to provide dividends of around 1.5% per year.
                        Please select your preference for dividends:
                      </h4>
                      <form>
                        <div>
                          <input
                            type="radio"
                            id="yes-dividends"
                            name="dividends-choice"
                            value="yes"
                            checked={
                              newIsReceivingDividends ? 'checked' : false
                            }
                            onClick={() => this.handleCheckYes()}
                          />
                          <label htmlFor="yes-dividends">
                            Yes! I&apos;d like dividends, thank you!
                          </label>
                        </div>
                        <div className="other-options">
                          <input
                            type="radio"
                            id="no-dividends"
                            name="dividends-choice"
                            value="no"
                            checked={
                              !newIsReceivingDividends ? 'checked' : false
                            }
                            onClick={() => this.handleCheckNo()}
                          />
                          <label htmlFor="no-dividends">
                            No dividends please! (No pressure to choose this
                            option. We provide the option because people who
                            waive dividends reduce the cost of capital, which
                            reduces the cost of solar and that helps our
                            cooperative grow its impact.)
                          </label>
                        </div>
                        <button
                          type="button"
                          className="save-preferences-button"
                          onClick={this.onClickSavePreferences}
                        >
                          Save Preferences
                        </button>
                      </form>
                    </div>
                  </Modal>
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
