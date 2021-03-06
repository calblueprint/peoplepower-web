import React from 'react';

class ProjectGroupListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      groups,
      displayedGroupId,
      view,
      changeSelectedGroup,
      handleViewChange
    } = this.props;

    const displayedGroup = groups.find(g => g.id === displayedGroupId);

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
                  onClick={() => changeSelectedGroup(group.id)}
                  className={`project-group-list-option justify-space-between left ${
                    group.id === displayedGroupId
                      ? 'project-group-list-option-selected'
                      : ''
                  }`}
                >
                  <div className="">
                    <div className="project-group-list-option-header">
                      {`${
                        group.name === 'Default Project Group'
                          ? 'No Project Group'
                          : group.name
                      }`}
                    </div>
                    {group.city ? (
                      <div className="project-group-list-option-body">
                        {group.city}, {group.state}
                      </div>
                    ) : (
                      <div className="project-group-list-option-body">
                        &nbsp;
                      </div>
                    )}
                  </div>
                  <div>{/* distance */}</div>
                </button>
                <br style={{ display: index === 0 ? 'none' : 'block' }} />
              </div>
            ))}
          </div>
        </div>
        {groups.length > 0 && (
          <div className="w-20 template-card projectgroup-selected-card">
            {displayedGroup ? (
              <div className="">
                <div className="projectgroup-selected-header">
                  {displayedGroup.name === 'Default Project Group'
                    ? 'No Project Group'
                    : displayedGroup.name}
                </div>
                <div className="projectgroup-selected-body">
                  {displayedGroup.description}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default ProjectGroupListView;
