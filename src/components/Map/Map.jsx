import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup, } from 'react-leaflet'
import L, { map } from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({address}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_DASHBOARD", // <--- change to fetch_hazard
    });
  }, []);


  const dashBoard = useSelector(store => store.dashBoardReducer)
  console.log("dashboard is", dashBoard)
  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */

  function getLocation() {
    // Geocode.fromAddress(address).then(
    //   (response) => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     console.log(lat, lng);
    //     setmapaddress([lat, lng]);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }

  return (
    <>
      <h1>{address}</h1>
      <Map center={address} zoom={14} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      {dashBoard.length > 0 ? (
        dashBoard.map((items, i) => (
          <div key={i}>
            <Marker position={[items.latitude, items.longitude]}>
              <Popup>
                <h5>{items.name}</h5>
                <h6>{items.city}, {items.state}</h6>
              </Popup>
            </Marker>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <FullscreenControl />
      </Map>


    </>
  );
}

export default MapComponent;
