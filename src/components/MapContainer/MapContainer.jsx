import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapComponent from '../Map/Map'
import Geocode from "react-geocode";
import PageHeader from '../PageHeader/PageHeader';
import useWatchLocation from "../../hooks/useWatchLocation";
import { geolocationOptions } from "../../constants/geolocationOptions";
import {  addDays, subDays } from 'date-fns';
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
  const [threat_level, set_threat_level] = useState('%');
  const [distance, set_distance] = useState('5');
  const [mapaddress, setmapaddress] = useState();
  const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);
  const [isWatchinForLocation, setIsWatchForLocation] = useState(true);
  const dashBoard = useSelector(store => store.dashBoardReducer);
  const [expanded, set_expanded] = useState('Expand Filters')
  const [created_date, setCreated_Date] = useState([
    {
      startDate: subDays(new Date(), 30),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  /**
   * making fetch request to  get the hazard genre/category 
   * */ 
  useEffect(() => {
    dispatch({
      type: "FETCH_HAZARD_GENRE",
    });
  }, [])

   const hazardCategory = useSelector((store) => store.hazardGenre);
  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */

    /**
   * Use Effect for user location
   * utilizes hook useWatchLocation
   */
  useEffect(() => {
    if (!location) return;
    // Cancel location watch after 3sec
    setTimeout(() => {
      cancelLocationWatch();
      setIsWatchForLocation(false);
    }, 3000);
  }, [location, cancelLocationWatch]);

  /**
   * Get Map Hazards
   * This function takes the filter data which is set in state by the user selection
   * Queries database as well as the External API for hazards that fit the criteria 
   */
  function getMapHazards() {
    let today = new Date();
    let priorDate = new Date().setDate(today.getDate()-30) // <-- 30 represents the number of days to go back from the current_date (TODAY)
    setCreated_Date({
      startDate: subDays(new Date(), 30),
      endDate: addDays(new Date(), 7),
      key: "selection",
    });

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setmapaddress([lat, lng]);
        dispatch({
          type: "FETCH_HAZARD",
          payload: {
            date: created_date,
            genreTitle: genre,
            userLatLng: {latitude: lat, longitude: lng},
            threat_Level: threat_level,
            distance: distance,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function click() {
    set_expanded('Close Filters')
  }

  /**
   * Is watching for location
   * this is required due to map render prior to getting back user lat / lng from Navigator.geolocation
   */
   if (isWatchinForLocation) {
    return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
  }

  return (
    <>
      <PageHeader 
        title = "Map"
        description = "All Hazards"
      />

      <div className="container">
        <button class="btn filter-expand btn-primary" type="button" onClick={() => click()} data-toggle="collapse" data-target="#collapseFilters" aria-expanded="false" aria-controls="collapseFilters">
          Filters
        </button>
        <div class="collapse" id="collapseFilters">
          <div className="form-group map-container-group card">
            <div class="input-group mb-3">

              {/* address */}
              <input
                onChange={(event) => setAddress(event.target.value)}
                className="form-control"
                value={address}
                placeholder="Address / Location"
              />

              {/* genre */}
              <select
                onChange={(event) => setgenre(event.target.value)}
                className="form-control"
                value={genre}
                id="genre"
                name="genre"
              >
                {hazardCategory.length > 0
                  ? hazardCategory.map((item, i) => (
                      <option key={i} value={item.title}>
                        {item.title}
                      </option>
                    ))
                  : null}
              </select>

              {/* threat level */}
              <select
                onChange={event => set_threat_level(event.target.value)}
                className="form-control"
                value={threat_level}
                placeholder="Threat Level"
              >
                <option selected>Select A Threat Level</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>

              {/* distance */}
              <select
                className="form-control"
                name="distance"
                id="distance"
                value={distance}
                onChange={(e) => set_distance(e.target.value)}
              >
                <option selected>Select A Distance</option>
                <option value=".25">Quarter Mile</option>
                <option value=".5">Half Mile</option>
                <option value="1">1 Miles</option>
                <option value="5">5 Miles</option>
                <option value="10">10 Miles</option>
                <option value="20">20 Miles</option>
                <option value="50">50 Miles</option>
              </select>

              {/* submit */}
              <div class="input-group-append">
                <button className="btn btn-primary" onClick={getMapHazards}>
                  Find Location
                </button>
              </div>

            </div>
          </div>
        </div>
        {mapaddress ? (
          <MapComponent address={mapaddress} />
        ) : (
          <MapComponent address={location} />
        )}
      </div>
    </>
  );
}

export default MapContainer;
