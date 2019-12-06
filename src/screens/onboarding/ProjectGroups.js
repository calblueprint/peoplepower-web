import React from 'react';
import formValidation from '../../lib/formValidation';
import '../../styles/Onboarding.css';
import MapView from './MapView';
import ListView from './ListView';
import { getAllProjectGroups } from '../../lib/onboardingUtils';
import { updateRecord } from '../../lib/request';

class ProjectGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [{}],
      displayGroup: 0,
      view: 'list',
      noProjectGroup: false
    };
  }

  componentDidMount() {
    getAllProjectGroups('Project Group').then(payload => {
      const projectGroups = [];
      console.log(payload.records);
      payload.records.map(record =>
        projectGroups.push({
          id: record.id,
          name: record.fields.Name,
          description: record.fields.Description,
          street: record.fields['Street 1'],
          apt: record.fields['Street 2'],
          city: record.fields.City,
          state: record.fields.State,
          zipcode: record.fields.Zipcode
        })
      );
      this.setState({ groups: projectGroups });
    });
  }

  changeDisplayedGroup = id => {
    this.setState({ displayGroup: id });
  };

  changeSelectedGroup = group => {
    const { handleChange } = this.props;
    const event = {
      target: {
        name: 'projectGroup',
        value: group
      }
    };
    handleChange(event);
  };

  selectNoProjectGroup = () => {
    const { noProjectGroup } = this.state;
    this.setState({ noProjectGroup: !noProjectGroup });
  };

  nextButton = () => {
    const { values, nextStep } = this.props;
    const { errors, projectGroup, personId } = values;
    const { noProjectGroup } = this.state;

    const errorMessage = formValidation('projectGroup', projectGroup);
    errors.projectGroup = errorMessage;
    console.log(projectGroup);

    if (errorMessage === '' || noProjectGroup) {
      const newOwner = {
        id: personId,
        fields: {
          'Project Group': projectGroup.id
        }
      };

      updateRecord('Owner', newOwner);
      nextStep();
    } else {
      this.forceUpdate();
    }
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  handleViewChange = () => {
    const { view } = this.state;
    if (view === 'map') {
      this.setState({
        view: 'list'
      });
    } else {
      this.setState({
        view: 'map'
      });
    }
  };

  render() {
    const { values, handleChange } = this.props;
    const { groups, displayGroup, view, noProjectGroup } = this.state;
    return (
      <div
        style={{
          margin: 'auto',
          width: '100%',
          height: '100vh',
          display: 'block'
        }}
      >
        <div>
          <MapView
            style={{ display: 'block', position: 'fixed' }}
            values={values}
            markers={groups}
            displayGroup={displayGroup}
            handleViewChange={this.handleViewChange}
            changeDisplayedGroup={this.changeDisplayedGroup}
            changeSelectedGroup={this.changeSelectedGroup}
            view={view}
          />
          <ListView
            style={{ display: 'block', position: 'fixed' }}
            values={values}
            groups={groups}
            displayGroup={displayGroup}
            handleViewChange={this.handleViewChange}
            changeSelectedGroup={this.changeSelectedGroup}
            changeDisplayedGroup={this.changeDisplayedGroup}
            view={view}
          />
          <div style={{ display: 'inline', position: 'relative' }}>
            <label className="checkbox-container">
              I don’t want to join a project group at this time.
              <input
                type="checkbox"
                name="mailingAddressSame"
                onClick={this.selectNoProjectGroup}
                onChange={handleChange}
                checked={noProjectGroup}
              />
              <span className="checkmark" />
            </label>
          </div>
          <div className="flex row w-100 right mt-2 justify-space-between">
            <div className="left">
              <button
                type="button"
                className="back-button"
                onClick={this.prevButton}
              >
                Go back
              </button>
            </div>
            <div className="right">
              <button
                type="button"
                className="continue-button"
                onClick={this.nextButton}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectGroups;
