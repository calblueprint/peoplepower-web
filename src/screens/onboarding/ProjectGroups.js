import React from 'react';
import formValidation from '../../lib/formValidation';
import '../../styles/Onboarding.css';
import MapView from './ProjectGroupMapView';
import ListView from './ProjectGroupListView';
import {
  updatePerson,
  updateOwner,
  getAllProjectGroups
} from '../../lib/request';

class ProjectGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultGroup: {},
      groups: [{}],
      displayGroup: 0,
      view: 'list'
    };
  }

  componentDidMount() {
    getAllProjectGroups().then(payload => {
      const projectGroups = [];
      payload.map(record =>
        projectGroups.push({
          id: record.ID,
          name: record.Name,
          description: record.Description,
          street: record['Street 1'],
          apt: record['Street 2'],
          city: record.City,
          state: record.State,
          zipcode: record.Zipcode,
          public: record['Is Public?'],
          default: record['Is Default?']
        })
      );
      const selectableGroups = projectGroups.filter(
        group => group.public && !group.default
      );
      const defaultGroup = projectGroups.find(group => group.default);
      this.setState({ groups: selectableGroups, defaultGroup });
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
      nextStep
    } = this.props;

    const errorMessage = formValidation('projectGroup', projectGroup);
    errors.projectGroup = errorMessage;

    if (projectGroup === '') {
      console.error('Need to make a selection');
    } else {
      const updatedPerson = {
        'Onboarding Step': 4
      };
      await updatePerson(userId, updatedPerson);

      const newOwner = {
        'Project Group': [projectGroup]
      };

      await updateOwner(personId, newOwner);
      nextStep();
    }
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  handleViewChange = () => {
    // TODO: Fix mapview and re-enable view-switching
    // const { view } = this.state;
    // this.setState({view: view === 'map' ? 'list' : 'map'})
  };

  render() {
    const { values } = this.props;
    const { projectGroup, errors } = values;
    const { groups, displayGroup, view, defaultGroup } = this.state;
    console.log(projectGroup);
    console.log(defaultGroup);
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
          {view === 'map' ? (
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
          ) : (
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
          )}
          <div style={{ display: 'inline', position: 'relative' }}>
            <label className="checkbox-container">
              I don’t want to join a project group at this time.
              <input
                type="checkbox"
                name="selectNoProjectGroup"
                onClick={() => this.changeSelectedGroup(defaultGroup)}
                checked={projectGroup === defaultGroup.id}
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
