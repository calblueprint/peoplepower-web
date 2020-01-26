import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

function ProjectGroupMapView(props) {
  const {
    google,
    markers,
    displayGroup,
    view,
    changeDisplayedGroup,
    changeSelectedGroup
  } = props;
  return (
    <div
      className="list "
      style={{ display: view === 'map' ? 'flex' : 'none' }}
    >
      <Map
        google={google}
        zoom={10}
        style={{
          width: '75%',
          height: '75%',
          borderRadius: 10,
          zIndex: 0
        }}
        // className="map-window"
        initialCenter={{
          lat: 37.8719,
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
            onClick={() => changeDisplayedGroup(index)}
          />
        ))}
      </Map>
      <div className="infoBox">
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
            onClick={() => changeSelectedGroup(markers[displayGroup])}
            name="projectGroup"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: googleApiKey
})(ProjectGroupMapView);
