import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup, } from 'react-leaflet'
import L from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "../Map/Map.css";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({address}) {
  const dispatch = useDispatch();
  const [showpop, setshowpop] = useState(true);

  useEffect(() => {
    dispatch({
      type: "FETCH_DASHBOARD", // <--- change to fetch_hazard
    });
  }, []);


  const dashBoard = useSelector(store => store.dashBoardReducer)
  console.log("dashboard is", dashBoard)

  function handleClick(event, name) {
    console.log('event', event);
    const { lat, lng } = event.latlng
    console.log(`Clicked at ${lat}, ${lng}`)
    console.log('name', name);
  }

  return (
    <>
      <h1>{address}</h1>
      <div className="map-popup-container">
        <Map center={address} zoom={14} style={{ height: "100vh" }}>
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
                  handleClick(e, items.name)
                }}
              >
                {/* <Popup>
                  <h5>{items.name}</h5>
                  <h6>{items.city}, {items.state}</h6>
                </Popup> */}
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
          <div className="popup-map-item">
            <h1>hi</h1>
          </div> 
          
          :
          <div className="popup-map-item">

          </div>
        }        
      </div>
    </>
  );
}

export default MapComponent;
