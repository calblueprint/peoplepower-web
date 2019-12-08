import React from 'react';
import formValidation from '../../lib/formValidation';
import '../../styles/Onboarding.css';
import MapView from './MapView';
import ListView from './ListView';
import { getAllProjectGroups } from '../../lib/onboardingUtils';
import { updatePerson, updateOwner } from '../../lib/request';

class ProjectGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [{}],
      displayGroup: 0,
      view: 'list'
    };
  }

  componentDidMount() {
    getAllProjectGroups('Project Group').then(payload => {
      const projectGroups = [];
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
    const { handleChange, values } = this.props;
    const { projectGroup } = values;
    let event;
    if (group.id === projectGroup) {
      event = {
        target: {
          name: 'projectGroup',
          value: ''
        }
      };
    } else {
      event = {
        target: {
          name: 'projectGroup',
          value: group.id
        }
      };
    }
    handleChange(event);
  };

  nextButton = async () => {
    const {
      values: { errors, projectGroup, personId, userId },
      nextStep,
      noProjectGroup
    } = this.props;

    const errorMessage = formValidation('projectGroup', projectGroup);
    errors.projectGroup = errorMessage;

    if (!noProjectGroup && projectGroup === '') {
      console.error('Need to make a selection');
    } else {
      const updatedPerson = {
        id: userId,
        fields: {
          'Onboarding Step': 4
        }
      };
      await updatePerson(updatedPerson);

      const newOwner = {
        id: personId,
        fields: {
          'Project Group': [projectGroup]
        }
      };

      await updateOwner(newOwner);
      nextStep();
    }
    // else {
    //   this.forceUpdate();
    // }
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
    const {
      values,
      handleChange,
      noProjectGroup,
      selectNoProjectGroup
    } = this.props;
    const { errors } = values;
    const { groups, displayGroup, view } = this.state;
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
                onClick={selectNoProjectGroup}
                onChange={handleChange}
                checked={noProjectGroup}
              />
              <span className="checkmark" />
            </label>
            <div className=" validation">
              {errors.projectGroup ? errors.projectGroup : '\u00A0'}
            </div>
          </div>

          <div className="flex onboarding-col w-100 right mt-2 justify-space-between">
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
