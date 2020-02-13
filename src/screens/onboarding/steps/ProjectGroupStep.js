import React from 'react';
import '../../../styles/Onboarding.css';
import MapView from './ProjectGroupMapView';
import ListView from './ProjectGroupListView';
import { getAvailableProjectGroups } from '../../../lib/onboardingUtils';

class ProjectGroupStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultGroup: {},
      allProjectGroups: [],
      displayGroupId: '',
      view: 'list'
    };
  }

  async componentDidMount() {
    const {
      selectableGroups,
      defaultGroup
    } = await getAvailableProjectGroups();
    this.setState({
      allProjectGroups: selectableGroups,
      defaultGroup,
      displayGroupId: selectableGroups.length > 0 && selectableGroups[0].id
    });
  }

  changeDisplayedGroup = groupId => {
    console.log(`Changing Displayed Group: ${groupId}`);

    this.setState({ displayGroupId: groupId });
  };

  changeSelectedGroup = groupId => {
    console.log(`Changing Selected Group: ${groupId}`);
    const { handleChange, owner } = this.props;
    let event;
    if (groupId === owner.projectGroupId) {
      event = {
        target: {
          name: 'projectGroupId',
          value: ''
        }
      };
    } else {
      event = {
        target: {
          name: 'projectGroupId',
          value: groupId
        }
      };
    }
    handleChange(event);
  };

  handleViewChange = () => {
    // TODO: Fix mapview and re-enable view-switching
    // const { view } = this.state;
    // this.setState({view: view === 'map' ? 'list' : 'map'})
  };

  render() {
    const { owner, errors, onSubmit, onBack } = this.props;
    const { allProjectGroups, displayGroupId, view, defaultGroup } = this.state;

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
              owner={owner}
              markers={allProjectGroups}
              displayGroup={displayGroupId}
              handleViewChange={this.handleViewChange}
              changeDisplayedGroup={this.changeDisplayedGroup}
              changeSelectedGroup={this.changeSelectedGroup}
              view={view}
            />
          ) : (
            <ListView
              groups={allProjectGroups}
              displayedGroupId={displayGroupId}
              selectedGroupId={owner.projectGroupId}
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
                onChange={() => this.changeSelectedGroup(defaultGroup)}
                checked={owner.projectGroupId === defaultGroup.id}
              />
              <span className="checkmark" />
            </label>
            <div className=" validation">
              {errors.projectGroupId ? errors.projectGroupId : '\u00A0'}
            </div>
          </div>

          <div className="flex onboarding-col w-100 right mt-2 justify-space-between">
            <div className="left">
              <button type="button" className="back-button" onClick={onBack}>
                Go back
              </button>
            </div>
            <div className="right">
              <button
                type="button"
                className="btn btn--rounded btn--blue btn--size16 continue-button"
                onClick={onSubmit}
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

export default ProjectGroupStep;
