import React from 'react';
import { connect } from 'react-redux';
import { updateOwner } from '../../lib/airtable/request';
import { refreshUserData } from '../../lib/redux/userData';
import { validateField } from '../../lib/onboardingUtils';
import '../../styles/UserProfilePage.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFirstName: '',
      updateLastName: '',
      updatePhoneNumber: '',
      updatePermanentStreet1: '',
      updatePermanentStreet2: '',
      updatePermanentCity: '',
      updatePermanentState: '',
      updatePermanentZipcode: '',
      generalEditMode: false,
      contactEditMode: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.populateOwnerInformation('both');
  }

  componentDidUpdate(prevProps) {
    const { owner } = this.props;
    if (owner !== prevProps.owner) {
      this.populateOwnerInformation('both');
    }
  }

  handleCancel = type => {
    this.setState({ [`${type}EditMode`]: false });
    this.populateOwnerInformation(type);
  };

  handleChange = event => {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
    });
  };

  validateAndSubmitData = async (newOwner, type) => {
    const { owner } = this.props;
    const errors = {};
    let foundErrors = false;
    const fields = Object.keys(newOwner);

    const errorMessages = await Promise.all(
      fields.map(field => validateField(field, newOwner[field]))
    );
    errorMessages.forEach((errorMessage, i) => {
      const fieldName = `update${fields[i].charAt(0).toUpperCase() +
        fields[i].slice(1)}`;
      errors[fieldName] = errorMessage;
      if (errorMessage !== '') {
        foundErrors = true;
      }
    });

    this.setState({
      errors
    });

    if (!foundErrors) {
      // Update owner and refresh local cache
      await updateOwner(owner.id, newOwner);
      await refreshUserData(owner.id);

      // Update Visual state
      const { generalEditMode, contactEditMode } = this.state;
      if (type === 'general') {
        this.setState({ generalEditMode: !generalEditMode });
      } else if (type === 'contact') {
        this.setState({ contactEditMode: !contactEditMode });
      }
    }
  };

  onContactButtonPressed = async () => {
    const {
      contactEditMode,
      updatePhoneNumber,
      updatePermanentStreet1,
      updatePermanentStreet2,
      updatePermanentCity,
      updatePermanentState,
      updatePermanentZipcode
    } = this.state;

    if (contactEditMode) {
      // Validate data
      this.validateAndSubmitData(
        {
          phoneNumber: updatePhoneNumber,
          permanentStreet1: updatePermanentStreet1,
          permanentStreet2: updatePermanentStreet2,
          permanentCity: updatePermanentCity,
          permanentState: updatePermanentState.toUpperCase(),
          permanentZipcode: updatePermanentZipcode
        },
        'contact'
      );
    } else {
      // Change visual state
      this.setState({
        contactEditMode: true
      });
    }
  };

  onGeneralButtonPressed = async () => {
    const { generalEditMode, updateFirstName, updateLastName } = this.state;
    if (generalEditMode) {
      // Validate data
      this.validateAndSubmitData(
        {
          firstName: updateFirstName,
          lastName: updateLastName
        },
        'general'
      );
    } else {
      // Change visual state
      this.setState({
        generalEditMode: true
      });
    }
  };

  populateOwnerInformation = type => {
    const { owner } = this.props;

    if (type === 'contact' || type === 'both') {
      this.setState({
        updatePhoneNumber: owner.phoneNumber,
        updatePermanentStreet1: owner.permanentStreet1,
        updatePermanentStreet2: owner.permanentStreet2,
        updatePermanentCity: owner.permanentCity,
        updatePermanentState: owner.permanentState,
        updatePermanentZipcode: owner.permanentZipcode
      });
    }
    if (type === 'general' || type === 'both') {
      this.setState({
        updateFirstName: owner.firstName,
        updateLastName: owner.lastName
      });
    }
  };

  renderInputLabel(name, editable) {
    const { [name]: value, errors } = this.state;
    return (
      <div>
        {editable ? (
          <input
            type="text"
            name={name}
            placeholder={value}
            value={value}
            onChange={this.handleChange}
          />
        ) : (
          <label className="settings-label">{value}</label>
        )}
        {errors[name] && (
          <label style={{ color: 'red' }}>Error: {errors[name]}</label>
        )}
      </div>
    );
  }

  render() {
    const {
      updateFirstName,
      updateLastName,
      generalEditMode,
      contactEditMode
    } = this.state;

    const { owner, projectGroup } = this.props;

    return (
      <div className="dashboard settings">
        <div className="cont">
          <div className="user-profile-settings-header">
            <h2>Settings</h2>
          </div>
          <div className="row">
            <div className="user-icon">
              <h3>{`${updateFirstName} ${updateLastName}`}</h3>
              <h4>General Owner</h4>
            </div>
            <div
              className={`user-profile-general-form settings-edit-${
                generalEditMode ? 'enabled' : 'disabled'
              }`}
            >
              <div className="user-profile-general-form-header">
                <h2>General</h2>
                <div className="user-profile-general-form-header-buttons">
                  <button type="button" onClick={this.onGeneralButtonPressed}>
                    {generalEditMode ? 'Save' : 'Edit'}
                  </button>
                  <button
                    style={{ display: generalEditMode ? '' : 'none' }}
                    type="button"
                    onClick={() => this.handleCancel('general')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <form>
                <div>
                  <p>
                    <label htmlFor="updateFirstName">
                      First Name
                      {this.renderInputLabel(
                        'updateFirstName',
                        generalEditMode
                      )}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateLastName">
                      Last Name
                      {this.renderInputLabel('updateLastName', generalEditMode)}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateEmail">
                      Email
                      <label className="settings-label">{owner.email}</label>
                    </label>
                  </p>
                </div>

                <div>
                  <p className="pg">
                    <label htmlFor="updatePG">
                      Project Group
                      <label className="settings-label">
                        {projectGroup.name}
                      </label>
                    </label>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div
              className={`contact-info-form settings-edit-${
                contactEditMode ? 'enabled' : 'disabled'
              }`}
            >
              <div className="user-profile-contact-form-header">
                <h2>Contact Information</h2>
                <div className="user-profile-contact-form-header-buttons">
                  <button type="button" onClick={this.onContactButtonPressed}>
                    {contactEditMode ? 'Save' : 'Edit'}
                  </button>
                  <button
                    style={{ display: contactEditMode ? '' : 'none' }}
                    type="button"
                    onClick={() => this.handleCancel('contact')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <form>
                <div>
                  <p>
                    <label htmlFor="updatePhone">
                      Phone Number:
                      {this.renderInputLabel(
                        'updatePhoneNumber',
                        contactEditMode
                      )}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updatePermanentStreet1">
                      Street 1:
                      {this.renderInputLabel(
                        'updatePermanentStreet1',
                        contactEditMode
                      )}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updatePermanentStreet2">
                      Street 2:
                      {this.renderInputLabel(
                        'updatePermanentStreet2',
                        contactEditMode
                      )}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updatePermanentCity">
                      City:
                      {this.renderInputLabel(
                        'updatePermanentCity',
                        contactEditMode
                      )}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updatePermanentState">
                      State:
                      {this.renderInputLabel(
                        'updatePermanentState',
                        contactEditMode
                      )}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updatePermanentZipcode">
                      Zip Code:
                      {this.renderInputLabel(
                        'updatePermanentZipcode',
                        contactEditMode
                      )}
                    </label>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  projectGroup: state.userData.projectGroup
});
export default connect(mapStateToProps)(UserProfile);
