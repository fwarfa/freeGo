import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapComponent from '../Map/Map'
import Geocode from "react-geocode";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyBbtf3Ot3DoK8yxfVML3Hfg2HdcIYwa-MM");

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

  const [address, setAddress] = useState([44.97464249999999, -93.2726928]);
  const [mapaddress, setmapaddress] = useState([44.97464249999999, -93.2726928]);

  useEffect(() => {
    dispatch({
      type: "FETCH_DASHBOARD", // <--- change to fetch_hazard
    });
  }, []);


  const dashBoard = useSelector(store => store.dashBoardReducer)
  // console.log("dashboard is", dashBoard)
  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */

  function getLocation() {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setmapaddress([lat, lng]);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <>
      <h1>{address}</h1>

      <input
          onChange={event => setAddress(event.target.value)}
          className="form-control"
          value={address}
          placeholder="Name"
        />
        <button className="btn btn-primary" onClick={getLocation}>Find Location</button>

        <MapComponent 
          address = {mapaddress}
        />
    </>
  );
}

export default MapContainer;
