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
      owner
    } = this.props;

    return (
      <div className="justify-space-between h-75" style={{ display: 'flex' }}>
        <div className="w-65 template-card left projectgroup-list-card">
          <div className="flex justify-space-between">
            {/* TODO: Implement Search */}
            <input
              className="project-group-list-search w-60"
              placeholder="Search for a project group"
            />
            <button
              type="button"
              onClick={handleViewChange}
              className="project-group-view-button right"
            >
              {view === 'map' ? 'List View' : 'Map View'}
            </button>
          </div>
          <div className="project-group-list-view">
            {groups.map((group, index) => (
              <div key={group.id}>
                <button
                  type="button"
                  onClick={() => changeDisplayedGroup(index)}
                  className={`project-group-list-option justify-space-between left ${
                    group.id === groups[displayGroup].id
                      ? 'project-group-list-option-background'
                      : ''
                  }`}
                >
                  <div className="">
                    <div className="project-group-list-option-header">
                      {`${group.name} ${
                        owner.projectGroupId === group.id ? '(Selected)' : ''
                      }`}
                    </div>
                    <div className="project-group-list-option-body">
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
            {owner.projectGroupId === groups[displayGroup].id ? (
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
                className="btn btn--square btn--pink btn--size16 btn--weight600 projectgroup-select"
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
