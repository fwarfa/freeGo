import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";
import AddHazardButton from "../AddHazardButton/AddHazardButton";

export default function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dashBoard = useSelector((store) => store.dashBoardReducer);

  useEffect(() => {
    fetchDashboard();
  }, []);

  //fetches dashboard data from the database
  function fetchDashboard() {
    dispatch({
      type: "FETCH_HAZARD",
    });
  }

  const getCardInfo = (id) => {
    console.log("card info id is", id);
    history.push(`/details/${id}`)
  }

  return (
    <>
      <AddHazardButton />
      <div className="container">
        <div className="row">
          {dashBoard.length > 0 ? (
            dashBoard.map((items, i) => (
              <>
                <div className="col-sm-6">
                  <div className="card" key={i}>
                    <div className="image-container">
                      <img src={items.image} alt="" onClick={() => getCardInfo(items.id)}/>
                    </div>
                    {console.log("items are", items)}
                    <LandingPageItems items={items} />{" "}
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
