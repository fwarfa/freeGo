import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapComponent from '../Map/Map'
import Geocode from "react-geocode";
import PageHeader from '../PageHeader/PageHeader';

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();


function MapContainer({userLocation}) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [genre, setgenre] = useState('');
  const [threat_level, set_threat_level] = useState('');
  const [mapaddress, setmapaddress] = useState([44.97464249999999, -93.2726928]);
  const dashBoard = useSelector(store => store.dashBoardReducer)
  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */

  function getLocation() {
    let newDate = new Date();


    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;

        setmapaddress([lat, lng]);

        dispatch({
          type: "FETCH_HAZARD",
          payload: {
            date: newDate.getDate(),
            genreTitle: genre,
            userLatLng: {latitude: lat, longitude: lng},
            threat_Level: threat_Level,
          },
        });
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <>
      <PageHeader 
        title = "Map"
        description = "View hazards on map - temp description"
      />
      <div className="container">
        <div className="form-group map-container-group">
          <div class="input-group mb-3">
            <input
                onChange={event => setAddress(event.target.value)}
                className="form-control"
                value={address}
                placeholder="Address / Location"
              />
            <input
              onChange={event => setgenre(event.target.value)}
              className="form-control"
              value={genre}
              placeholder="Genre"
            />

            <select
              className="form-control"
              name="threatLevel"
              id="threatLevel"
              value={threat_level}
              onChange={(e) => set_threat_level(e.target.value)}
            >
              <option selected>Select A Threat Level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>

            <div class="input-group-append">
            <button className="btn btn-primary" onClick={getLocation}>Find Location</button>
            </div>
          </div>
        </div>
        <MapComponent 
          address = {mapaddress}
        />
      </div>

    </>
  );
}

export default MapContainer;
