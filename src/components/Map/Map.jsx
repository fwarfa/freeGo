import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L, {latLngBounds} from 'leaflet';
import { useHistory } from "react-router-dom";
// import FullscreenControl from 'react-leaflet-fullscreen';
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import icon2 from '../Map/placeholder.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "../Map/Map.css";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({address}) {
  const history = useHistory();
  const [showpop, setshowpop] = useState(false);
  const [hazard, sethazard] = useState();
  const dashBoard = useSelector(store => store.dashBoardReducer)

  const getCardInfo = (id) => {
    history.push(`/details/${id}`)
  }

  const getCardInfo2 = (item) => {
    history.push({
      pathname: '/detail-external',
      state: item
    })
  }

  if (address instanceof Array) {
    // DO NOTHING
  } else {
    address = Object.keys(address).map((key) => address[key]);
  }

  const bounds = latLngBounds(L.latLng(address));
  
  if(dashBoard.length > 0) {
    dashBoard.forEach((data) => {
      bounds.extend([data.latitude, data.longitude])
    })
  } else {
    bounds.extend(address)
  }

  return (
    <>
      <div className="map-popup-container">
        <Map center={address} zoom={14} bounds={bounds} style={{ height: "600px" }}>
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
        </Map>
        {
          showpop === true 
          ?
          <div className="popup-map-item card animate__animated animate__slideInUp">
             {hazard.is_minn == true ? (
                <div className="row no-gutters">
                  <div className="image-container col-sm-4">
                    <img onClick={() => getCardInfo2(hazard)} src={hazard.image} alt=""/>
                  </div>
                  <div className="information-conatiner col-sm-7">
                    <button type="button" class="close btn-map-close" onClick={() => setshowpop(false)} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <span className="badge badge-pill badge-primary" className={'badge-'+hazard.threat_level + ' badge badge-pill badge-primary'}>{hazard.threat_level}</span>
                    <div onClick={() => getCardInfo(hazard)} className="card-title">{hazard.name}</div>
                    <div className="">
                      <div className="map-card-location">
                        <FontAwesomeIcon icon={faMapMarkedAlt} />
                        {hazard.street}, {hazard.city}, {hazard.state}, {hazard.zip}
                      </div>
                    </div>
                  </div>  
                </div>
             ) : (
              <div className="row no-gutters">
                <div className="image-container col-sm-4">
                  <img onClick={() => getCardInfo(hazard.id)} src={hazard.image} alt=""/>
                </div>
                <div className="information-conatiner col-sm-7">
                  <button type="button" class="close btn-map-close" onClick={() => setshowpop(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <span className="badge badge-pill badge-primary" className={'badge-'+hazard.threat_level + ' badge badge-pill badge-primary'}>{hazard.threat_level}</span>
                  <div onClick={() => getCardInfo(hazard.id)} className="card-title">{hazard.name}</div>
                  <div className="">
                    <div className="map-card-location">
                      <FontAwesomeIcon icon={faMapMarkedAlt} />
                      {hazard.street}, {hazard.city}, {hazard.state}, {hazard.zip}
                    </div>
                  </div>
                </div>  
              </div>
             )}

          </div> 
          :
          <div className="popup-map-item"></div>
        }        
      </div>
    </>
  );
}

export default MapComponent;