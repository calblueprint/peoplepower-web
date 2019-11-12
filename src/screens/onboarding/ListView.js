import React from 'react';

class ListView extends React.Component {
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
      changeDisplayedGroup
    } = this.props;
    return (
      <div
        className="list "
        style={{ display: view === 'list' ? 'flex' : 'none' }}
      >
        <div className="w-60 listcard">
          {groups.map((group, index) => (
            <button type="button" onClick={() => changeDisplayedGroup(index)}>
              <div className="">
                {group.name}
                {group.city}, {group.state}
                <br style={{ display: index === 0 ? 'none' : 'block' }} />
              </div>
            </button>
          ))}
        </div>
        <div className="listcard">
          <div style={{ margin: '20px' }}>
            <div style={{ fontSize: '24px', paddingBottom: '10px' }}>
              {groups[displayGroup].name}
            </div>
            <div style={{ fontSize: '14px', paddingBottom: '20px' }}>
              {groups[displayGroup].description}
            </div>
            <button
              type="button"
              style={{ bottom: 0 }}
              onClick={() => changeSelectedGroup(groups[displayGroup])}
              name="projectGroup"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListView;
