import React from "react";
import '../LandingPage/LandingPage.css'
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

export default function LandingPageItems({ items }) {
  const history = useHistory();
  const user = useSelector(store => store.user);

  const handleClick = (id) => {
    history.push(`/edithazard/${id}`);
  }

  return (
    <>
      <div className="information-conatiner">
        <h3 className="Hazard-Genre">{items.name}</h3>
        <h3 className="threat">
         <span>{items.title}</span>
        </h3>
        <h3 className="threat">
          Threat Level {items.threat_level}
        </h3>
        <div className="status">
          <p className="threatLevel">
            Status:{" "}
            {items.approved === true ? (
              <span>Approved</span>
            ) : (
              <span>Not approved</span>
            )}
          </p>
        </div>
        <div className="address">
          <p>
            <i className="fa fa-map-marker"></i> {items.street}, {items.city}{" "}
            {items.state}
          </p>
          { items.user_id === user.id &&
            <button onClick={() => handleClick(items.id)}>Edit</button>
          }
        </div> 
      </div>
    </>
  );
}
