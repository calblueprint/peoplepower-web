import React from 'react';
import { connect } from 'react-redux';
import { updateOwner } from '../../lib/airtable/request';
import LoadingComponent from '../../components/LoadingComponent';
import { refreshUserData } from '../../lib/userDataUtils';
import '../../styles/UserProfilePage.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFirstName: '',
      updateLastName: '',
      updatePhoneNumber: '',
      updateStreet1: '',
      updateStreet2: '',
      updateCity: '',
      updateState: '',
      updateZipcode: '',
      generalEditMode: false,
      contactEditMode: false
    };
  }

  componentDidMount() {
    this.pullPropsIntoState();
  }

  componentDidUpdate(prevProps) {
    const { owner } = this.props;
    if (owner !== prevProps.owner) {
      this.pullPropsIntoState();
    }
  }

  pullPropsIntoState = () => {
    const { owner, isLoadingUserData } = this.props;

    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    this.setState({
      updateFirstName: owner.firstName,
      updateLastName: owner.lastName,
      updatePhoneNumber: owner.phoneNumber,
      updateStreet1: owner.permanentStreet1,
      updateStreet2: owner.permanentStreet2,
      updateCity: owner.permanentCity,
      updateState: owner.permanentState,
      updateZipcode: owner.permanentZipcode
    });
  };

  handleChange = event => {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
    });
  };

  onContactButtonPressed = async () => {
    const {
      contactEditMode,
      updatePhoneNumber,
      updateStreet1,
      updateStreet2,
      updateCity,
      updateState,
      updateZipcode
    } = this.state;
    const { owner } = this.props;

    if (contactEditMode) {
      // Save data and update owner.
      await updateOwner(owner.id, {
        phoneNumber: updatePhoneNumber,
        permanentStreet1: updateStreet1,
        permanentStreet2: updateStreet2,
        permanentCity: updateCity,
        permanentState: updateState.toUpperCase(),
        permanentZipcode: updateZipcode
      });

      // Refresh local cache with latest user data
      await refreshUserData(owner.id);
    }

    // Change visual state
    this.setState({
      contactEditMode: !contactEditMode
    });
  };

  onGeneralButtonPressed = async () => {
    const { generalEditMode, updateFirstName, updateLastName } = this.state;
    const { owner } = this.props;

    if (generalEditMode) {
      // Save data and update owner.
      await updateOwner(owner.id, {
        lastName: updateLastName,
        firstName: updateFirstName
      });

      // Refresh local cache with latest user data
      await refreshUserData(owner.id);
    }

    // Change visual state
    this.setState({
      generalEditMode: !generalEditMode
    });
  };

  renderInputLabel(name, editable) {
    const { [name]: value } = this.state;
    if (editable) {
      return (
        <input
          type="text"
          name={name}
          placeholder={value}
          value={value}
          onChange={this.handleChange}
        />
      );
    }
    return <label className="settings-label">{value}</label>;
  }

  render() {
    const {
      updateFirstName,
      updateLastName,
      generalEditMode,
      contactEditMode
    } = this.state;

    const { owner, projectGroup, isLoadingUserData } = this.props;

    return isLoadingUserData ? (
      <LoadingComponent />
    ) : (
      <div className="dashboard settings">
        <div className="cont">
          <h2>Settings</h2>
          <div className="row">
            <div className="user-icon">
              <h3>{`${updateFirstName} ${updateLastName}`}</h3>
              <h4>General Owner</h4>
            </div>
            <div
              className={`general-form settings-edit-${
                generalEditMode ? 'enabled' : 'disabled'
              }`}
            >
              <div className="general-form-header">
                <h2>General</h2>
                <button type="button" onClick={this.onGeneralButtonPressed}>
                  {generalEditMode ? 'Save' : 'Edit'}
                </button>
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
              <div className="contact-form-header">
                <h2>Contact Information</h2>
                <button type="button" onClick={this.onContactButtonPressed}>
                  {contactEditMode ? 'Save' : 'Edit'}
                </button>
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
                    <label htmlFor="updateStreet1">
                      Street 1:
                      {this.renderInputLabel('updateStreet1', contactEditMode)}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateStreet2">
                      Street 2:
                      {this.renderInputLabel('updateStreet2', contactEditMode)}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateCity">
                      City:
                      {this.renderInputLabel('updateCity', contactEditMode)}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateState">
                      State:
                      {this.renderInputLabel('updateState', contactEditMode)}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateZipcode">
                      Zip Code:
                      {this.renderInputLabel('updateZipcode', contactEditMode)}
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
  projectGroup: state.userData.projectGroup,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(UserProfile);
