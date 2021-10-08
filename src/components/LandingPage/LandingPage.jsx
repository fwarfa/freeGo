import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";

export default function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchDashboard();
  }, []);

  //fetches dashboard data from the database
  function fetchDashboard() {
    dispatch({
      type: "FETCH_HAZARD",
    });
  }
  
  const handleClick = () => {
    history.push('/addhazard');
  }
  
  const dashBoard = useSelector(store => store.dashBoardReducer)
  // console.log("dashboard is", dashBoard)
  
  return (
    <div className="container">
      <button onClick={handleClick}>Add A Hazard</button>
      {dashBoard.length > 0 ? (
        dashBoard.map((items, i) => (
          <div key={i}>
            {console.log("items are", items)}
            <LandingPageItems items={items} />{" "}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
