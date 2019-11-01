import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import formValidation from '../../lib/formValidation';
import '../../styles/Onboarding.css';

class ProjectGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          id: 1,
          name: 'UC Berkeley',
          description:
            'Berkeley (/ˈbɜːrkli/ BURK-lee) is a city on the east shore of San Francisco Bay in northern Alameda' +
            '                County, California. It is named after the 18th-century Irish bishop and philosopher George Berkeley. It' +
            '                borders the cities of Oakland and Emeryville to the south and the city of Albany and the unincorporated' +
            '                community of Kensington to the north...',
          lat: 37.8719,
          lng: -122.2585
        },
        {
          id: 2,
          name: 'Oakland',
          description:
            'Oakland is a city on the east side of San Francisco Bay, in California. Jack London Square has ' +
            'a statue of the writer, who frequented the area. Nearby, Old Oakland features restored Victorian ' +
            'architecture and boutiques. Near Chinatown, the Oakland Museum of California covers state history, ' +
            'nature and art.',
          lat: 37.8044,
          lng: -122.2712
        }
      ],
      displayGroup: 0
      // currentLocation: {
      //   lat: 0,
      //   lng: 0
      // }
    };
  }

  changeDisplayedGroup = id => {
    this.setState({ displayGroup: id });
  };

  changeSelectedGroup = group => {
    // this.setState({selectedGroup : event.target.value});
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
    const { errors, projectGroup } = values;

    const errorMessage = formValidation('projectGroup', projectGroup);
    errors[projectGroup] = errorMessage;
    if (errorMessage === '') {
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

  render() {
    const { values, google } = this.props;
    const { errors } = values;
    const { markers, displayGroup } = this.state;

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
          <div
            style={{
              fontSize: '24px',
              marginBottom: '20px',
              marginTop: '20px'
            }}
          >
            Project Group
          </div>
          <Map
            google={google}
            zoom={14}
            style={{
              width: '75%',
              height: '75%',
              borderRadius: 10,
              zIndex: 0,
              position: 'absolute'
            }}
            className="map"
            initialCenter={{
              lat: 40,
              lng: -122.2585
            }}
            zoomControl
            zoomControlOptions={{
              position: google.maps.ControlPosition.LEFT_CENTER
            }}
            mapTypeControl={false}
            scaleControl={false}
            streetViewControl={false}
            rotateControl={false}
            fullscreenControl
          >
            {markers.map((marker, index) => (
              <Marker
                name={marker.name}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => this.changeDisplayedGroup(index)}
              />
            ))}
          </Map>
        </div>
        <div
          style={{
            background: 'white',
            color: 'black',
            borderRadius: 10,
            zIndex: 2,
            position: 'absolute',
            width: '20%',
            height: '60%',
            marginTop: '40px',
            marginLeft: '10px',
            right: '20%'
          }}
        >
          <div style={{ margin: '20px' }}>
            <div style={{ fontSize: '24px', paddingBottom: '10px' }}>
              {markers[displayGroup].name}
            </div>
            <div style={{ fontSize: '14px', paddingBottom: '20px' }}>
              {markers[displayGroup].description}
            </div>
            <button
              type="button"
              style={{ bottom: 0 }}
              onClick={() => this.changeSelectedGroup(markers[displayGroup])}
              name="projectGroup"
            >
              Select
            </button>
          </div>
        </div>

        <div
          style={{
            zIndex: 2,
            display: 'flex',
            justifyContent: 'space-between',
            bottom: 0,
            position: 'fixed'
          }}
        >
          <div>{errors.projectGroup ? errors.projectGroup : '\u00A0'}</div>
          <button
            style={{ float: 'left', textAlign: 'left' }}
            type="button"
            onClick={this.prevButton}
          >
            Prev
          </button>
          <button
            style={{ textAlign: 'right' }}
            type="button"
            onClick={this.nextButton}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

// export default ProjectGroups;

export default GoogleApiWrapper({
  apiKey: 'api_key'
})(ProjectGroups);
