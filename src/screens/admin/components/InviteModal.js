import React from 'react';
import Modal from 'react-modal';
import Success from '../../../assets/success.png';

export default class InviteModal extends React.PureComponent {
  render() {
    const { state, projectGroup, handleChange, handleCloseModal } = this.props;
    const {
      showModal,
      showSuccessModal,
      inviteFirstName,
      inviteLastName,
      invitePhoneNumber,
      inviteShareAmount,
      inviteEmail,
      status
    } = state;
    return (
      <div>
        <Modal
          isOpen={showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={() => handleCloseModal('success')}
          className="admin-modal"
          overlayClassName="admin-modal-overlay"
        >
          <h3>Invite a Member to {projectGroup.name}</h3>
          <div className="admin-invite-form">
            <form onSubmit={this.handleSubmit}>
              <div className="admin-invite-form-row">
                <div>
                  <div>
                    <label htmlFor="inviteFirstName">
                      <div className="admin-invite-form-label-wrapper">
                        First name{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="inviteFirstName"
                        placeholder="Aivant"
                        className="admin-invite-form-input"
                        value={inviteFirstName}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="inviteLastName">
                      <div className="admin-invite-form-label-wrapper">
                        Last name{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="inviteLastName"
                        placeholder="Goyal"
                        className="admin-invite-form-input"
                        value={inviteLastName}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-invite-form-row">
                <div>
                  <div>
                    <label htmlFor="invitePhoneNumber">
                      <div className="admin-invite-form-label-wrapper">
                        Phone number{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="invitePhoneNumber"
                        placeholder="123-456-7890"
                        className="admin-invite-form-input"
                        value={invitePhoneNumber}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="inviteEmail">
                      <div className="admin-invite-form-label-wrapper">
                        Email{' '}
                        <span className="admin-invite-form-required-flag">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="inviteEmail"
                        placeholder="invitees_email@gmail.com"
                        className="admin-invite-form-input"
                        value={inviteEmail}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-invite-form-row">
                <div>
                  <div>
                    <label htmlFor="inviteShareAmount">
                      Number of shares
                      <input
                        type="text"
                        name="inviteShareAmount"
                        placeholder="Number between $0 to $1000"
                        className="admin-invite-form-input"
                        value={inviteShareAmount}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-invite-form-row admin-invite-form-row-submit">
                <div>
                  <input
                    type="submit"
                    value="Send Invite"
                    className="admin-invite-form-submit"
                  />
                </div>
                <h4 className="status-text">{status}</h4>
              </div>
            </form>
          </div>
        </Modal>
        {!status ? (
          <Modal
            isOpen={showSuccessModal}
            contentLabel="onRequestClose Example"
            onRequestClose={() => this.handleCloseModal('success')}
            className="invite-success-modal"
            overlayClassName="admin-modal-overlay"
          >
            <div className="invite-success-container">
              <img
                src={Success}
                alt="success"
                className="invite-success-icon"
              />
              <h2 className="invite-success-title">
                Your invitation is on it&apos;s away!
              </h2>
              <div className="invite-success-description">
                We’ve sent your invitation to{' '}
                <span className="invite-success-name">
                  {inviteFirstName} {inviteLastName}
                </span>
                . They should be receiving a personal link to create an account
                in no more than 5 minutes.
              </div>
              <buton
                className="invite-success-button"
                onClick={() => this.handleCloseModal('success')}
              >
                Okay
              </buton>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}
