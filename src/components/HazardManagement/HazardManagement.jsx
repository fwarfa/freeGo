import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import LandingPage from "../LandingPage/LandingPage";
import "../HazardManagement/HazardManagement.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const HazardManagement = () => {
    const history = useHistory()
  const dispatch = useDispatch();
  const hazard = useSelector((store) => store.userHazard);
  const user = useSelector(store => store.user);
  

  useEffect(() => {
    console.log('user id is ', user.id);
    dispatch({ 
      type: "FETCH_USER_HAZARD",
      payload: user.id 
    });
  }, []);

  const deleteItem = (id) => {
    console.log("delete clicked for: ", id);
    dispatch({
      type: "DELETE_HAZARD_ITEM",
      payload: id,
    });
  };

  const editItem = (id) => {
    console.log("item to edit is", id);
    history.push(`/edithazard/${id}`)
  };

  return (
    <div className="container">
      {hazard.length > 0 ? (
        hazard.map((item, i) => (
          <div className="card hazard-management-card card" key={i}>
            <div className="image-container">
              <img src={item.image} alt="" />
            </div>
            <div className="information-container">
              <h3 className="Hazard-Genre">{item.name}</h3>
              <h3 className="threat">
                <span>{item.title}</span>
              </h3>
              <h3 className="threat">Threat Level {item.threat_level}</h3>
              <div className="status">
                <p className="threatLevel">
                  Status:{" "}
                  {item.approved === true ? (
                    <span>Approved</span>
                  ) : (
                    <span>Not approved</span>
                  )}
                </p>
              </div>
              <div className="address">
                <p>
                  <i className="fa fa-map-marker"></i> {item.street},{" "}
                  {item.city} {item.state}
                </p>
              </div>
            </div>
            <div className="hazard-management-button-container">
              <button className="btn-hazard-management-edit" onClick={() => editItem(item.id)}><FontAwesomeIcon icon={faEdit} /></button>
              <button className="btn-hazard-management-delete" onClick={() => deleteItem(item.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HazardManagement;
