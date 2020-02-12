import React from 'react';
import '../../../styles/Onboarding.css';
import MapView from '../components/ProjectGroupMapView';
import ListView from '../components/ProjectGroupListView';
import { getAvailableProjectGroups } from '../../../lib/onboardingUtils';

class ProjectGroupStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultGroup: {},
      allProjectGroups: [],
      displayGroup: 0,
      view: 'list'
    };
  }

  async componentDidMount() {
    const {
      selectableGroups,
      defaultGroup
    } = await getAvailableProjectGroups();
    this.setState({ allProjectGroups: selectableGroups, defaultGroup });
  }

  changeDisplayedGroup = id => {
    this.setState({ displayGroup: id });
  };

  changeSelectedGroup = group => {
    const { handleChange, owner } = this.props;
    let event;
    if (group.id === owner.projectGroupId[0]) {
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
          value: group.id
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
    const { allProjectGroups, displayGroup, view, defaultGroup } = this.state;

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
              owner={owner}
              markers={allProjectGroups}
              displayGroup={displayGroup}
              handleViewChange={this.handleViewChange}
              changeDisplayedGroup={this.changeDisplayedGroup}
              changeSelectedGroup={this.changeSelectedGroup}
              view={view}
            />
          ) : (
            <ListView
              style={{ display: 'block', position: 'fixed' }}
              owner={owner}
              groups={allProjectGroups}
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
                onChange={() => this.changeSelectedGroup(defaultGroup)}
                checked={owner.projectGroupId[0] === defaultGroup.id}
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
