import React from 'react';

class ProjectGroupListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      groups,
      displayGroup,
      view,
      changeSelectedGroup,
      changeDisplayedGroup,
      handleViewChange,
      values
    } = this.props;
    const { projectGroup } = values;
    return (
      <div className="justify-space-between h-75" style={{ display: 'flex' }}>
        <div className="w-65 template-card left projectgroup-list-card">
          <div className="flex justify-space-between">
            {/* TODO: Implement Search */}
            <input
              className="projectGroup-list-search w-60"
              placeholder="Search for a project group"
            />
            <button
              type="button"
              onClick={handleViewChange}
              className="projectGroup-view-button right"
            >
              {view === 'map' ? 'List View' : 'Map View'}
            </button>
          </div>
          <div className="projectGroup-list-view">
            {groups.map((group, index) => (
              <div key={group.id}>
                <button
                  type="button"
                  onClick={() => changeDisplayedGroup(index)}
                  className={`projectGroup-list-option justify-space-between left ${
                    group.id === groups[displayGroup].id
                      ? 'projectGroup-list-option-background'
                      : ''
                  }`}
                >
                  <div className="">
                    <div className="projectGroup-list-option-header">
                      {`${group.name} ${
                        projectGroup === group.id ? '(Selected)' : ''
                      }`}
                    </div>
                    <div className="projectGroup-list-option-body">
                      {group.city}, {group.state}
                    </div>
                  </div>
                  <div>{/* distance */}</div>
                </button>
                <br style={{ display: index === 0 ? 'none' : 'block' }} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-20 template-card projectgroup-selected-card">
          <div className="">
            <div className="projectgroup-selected-header">
              {groups[displayGroup].name}
            </div>
            <div className="projectgroup-selected-body">
              {groups[displayGroup].description}
            </div>
            {projectGroup === groups[displayGroup].id ? (
              <button
                type="button"
                className="projectgroup-selected"
                onClick={() => changeSelectedGroup(groups[displayGroup])}
                name="projectGroup"
              >
                Selected
              </button>
            ) : (
              <button
                type="button"
                className="pp-pink-square-button projectgroup-select"
                onClick={() => changeSelectedGroup(groups[displayGroup])}
                name="projectGroup"
              >
                Select
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectGroupListView;
