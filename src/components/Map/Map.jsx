import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup, } from 'react-leaflet'
import L from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "../Map/Map.css";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({address}) {
  const dispatch = useDispatch();
  const [showpop, setshowpop] = useState(false);
  const [hazard, sethazard] = useState();

  /**
   * Dispatch Fetch Dashboard
   * returns all hazards
   */
  useEffect(() => {
    dispatch({
      type: "FETCH_HAZARD", // <--- change to fetch_hazard
    });
  }, []);

  const dashBoard = useSelector(store => store.dashBoardReducer)

  return (
    <>
      <span>current address: {address}</span>
      <div className="map-popup-container">
        <Map center={address} zoom={14} style={{ height: "600px" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        {dashBoard.length > 0 ? (
          dashBoard.map((items, i) => (
            <div key={i}>
              <Marker 
                position={[items.latitude, items.longitude]}
                onClick={(e) => {
                  sethazard(items);
                  setshowpop(true);
                }}
              >
              </Marker>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <FullscreenControl />
        </Map>

        {
          showpop === true 
          ?
          <div className="popup-map-item card animate__animated animate__slideInUp">
            <button type="button" class="close" onClick={() => setshowpop(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="row no-gutters">
              <div className="card-title">{hazard.name}</div>
              <div className="card-body">
                {hazard.description}  
              </div>
            </div>
            <FontAwesomeIcon icon={["fal", "coffee"]} />
          </div> 
          
          :
          <div className="popup-map-item"></div>
        }        
      </div>
    </>
  );
}

export default MapComponent;
