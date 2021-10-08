import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import LandingPage from "../LandingPage/LandingPage";
const HazardManagement = () => {
    const history = useHistory()
  const dispatch = useDispatch();
  const hazard = useSelector((store) => store.dashBoardReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_HAZARD" });
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
    history.push(`edithazard/${id}`)
  };

  return (
    <div className="container">
      {hazard.length > 0 ? (
        hazard.map((item, i) => (
          <div key={i}>
            <div className="image-container">
              <img src={item.image} alt="" />
            </div>
            <div className="information-conatiner">
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
            <button onClick={() => editItem(item.id)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HazardManagement;
