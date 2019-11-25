import React from 'react';
import formValidation from '../../lib/formValidation';
import '../../styles/Onboarding.css';
import MapView from './MapView';
import ListView from './ListView';
import { getAllRecords } from '../../lib/request';

class ProjectGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          id: 1,
          name: "Fang's Solar Panels",
          description:
            'Berkeley (/ˈbɜːrkli/ BURK-lee) is a city on the east shore of San Francisco Bay in northern Alameda' +
            '                County, California. It is named after the 18th-century Irish bishop and philosopher George Berkeley. It' +
            '                borders the cities of Oakland and Emeryville to the south and the city of Albany and the unincorporated' +
            '                community of Kensington to the north...',
          lat: 37.8719,
          lng: -122.2585,
          city: 'Berkeley',
          state: 'CA'
        },
        {
          id: 2,
          name: "Nick's Solar Panels",
          description:
            'Oakland is a city on the east side of San Francisco Bay, in California. Jack London Square has ' +
            'a statue of the writer, who frequented the area. Nearby, Old Oakland features restored Victorian ' +
            'architecture and boutiques. Near Chinatown, the Oakland Museum of California covers state history, ' +
            'nature and art.',
          lat: 37.8044,
          lng: -122.2712,
          city: 'Oakland',
          state: 'CA'
        }
      ],
      displayGroup: 0,
      // currentLat: 0,
      // currentLng: 0
      view: 'map'
    };
  }

  componentDidMount() {
    getAllRecords('Project Group').then(payload => {
      console.log(payload);
      // const { Name: name } = payload.record;
      // this.setState({
      //   name
      // });
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

  nextButton = () => {
    const { values, nextStep } = this.props;
    const { errors, projectGroup, noProjectGroup } = values;

    const errorMessage = formValidation(projectGroup);
    errors.projectGroup = errorMessage;
    if (errorMessage === '' || noProjectGroup) {
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
    const { errors, noProjectGroup } = values;
    const { groups, displayGroup, view } = this.state;
    return (
      <div
        style={{
          margin: 'auto',
          width: '75%',
          height: '100vh',
          display: 'block'
        }}
      >
        <div>
          <div className="header">Project Group</div>
          <button type="button" onClick={this.handleViewChange}>
            {view === 'map' ? 'List View' : 'Map View'}
          </button>
          <MapView
            style={{ display: 'block', position: 'fixed' }}
            values={values}
            markers={groups}
            displayGroup={displayGroup}
            changeDisplayedGroup={this.changeDisplayedGroup}
            changeSelectedGroup={this.changeSelectedGroup}
            view={view}
          />
          <ListView
            style={{ display: 'block', position: 'fixed' }}
            values={values}
            groups={groups}
            displayGroup={displayGroup}
            changeSelectedGroup={this.changeSelectedGroup}
            changeDisplayedGroup={this.changeDisplayedGroup}
            view={view}
          />
          <div style={{ display: 'block', position: 'relative' }}>
            <input
              type="checkbox"
              name="noProjectGroup"
              onChange={handleChange}
              checked={noProjectGroup}
            />
            <div className="checkbox-text">
              I don’t want to join a project group at this time.
            </div>
          </div>
          <div className="bottomButtons">
            <div style={{ position: 'relative', margin: 'auto' }}>
              <div>{errors.projectGroup ? errors.projectGroup : '\u00A0'}</div>
              <button
                style={{
                  float: 'left',
                  textAlign: 'left',
                  left: 0,
                  marginRight: '10rem'
                }}
                type="button"
                onClick={this.prevButton}
              >
                Prev
              </button>
              <button
                style={{ float: 'right', textAlign: 'right', right: 0 }}
                type="button"
                onClick={this.nextButton}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectGroups;
