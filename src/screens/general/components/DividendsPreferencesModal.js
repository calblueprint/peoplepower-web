import React from 'react';
import Modal from 'react-modal';

// Props to this class are onClickSavePrefences from Investment.js

export default class DividendsPreferencesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      newIsReceivingDividends: props.newIsReceivingDividends
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleCheckYes = () => {
    this.setState({ newIsReceivingDividends: true });
  };

  handleCheckNo = () => {
    this.setState({ newIsReceivingDividends: false });
  };

  handleSubmit = () => {
    const { onClickSavePreferences } = this.props;
    const { newIsReceivingDividends } = this.state;
    onClickSavePreferences(newIsReceivingDividends);
    this.handleCloseModal();
  };

  render() {
    const { showModal, newIsReceivingDividends } = this.state;

    return (
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
              We aim to provide dividends of around 1.5% per year. Please select
              your preference for dividends:
            </h4>
            <form>
              <div>
                <input
                  type="radio"
                  id="yes-dividends"
                  name="dividends-choice"
                  value="yes"
                  checked={newIsReceivingDividends ? 'checked' : false}
                  onClick={this.handleCheckYes}
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
                  checked={!newIsReceivingDividends ? 'checked' : false}
                  onClick={this.handleCheckNo}
                />
                <label htmlFor="no-dividends">
                  No dividends please! (No pressure to choose this option. We
                  provide the option because people who waive dividends reduce
                  the cost of capital, which reduces the cost of solar and that
                  helps our cooperative grow its impact.)
                </label>
              </div>
              <button
                type="button"
                className="save-preferences-button"
                onClick={this.handleSubmit}
              >
                Save Preferences
              </button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}