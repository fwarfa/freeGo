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
    history.push("/addhazard");
  };

  const dashBoard = useSelector((store) => store.dashBoardReducer);

  const getCardInfo = (id)=> {
    console.log("card info id is", id);
    history.push(`/details/${id}`)

  }
  return (
    <>
      {dashBoard.length > 0 ? (
        dashBoard.map((items, i) => (
          <>
            <div className="container" key={i} onClick={() => getCardInfo(items.id)}>
              <button onClick={handleClick}>Add A Hazard</button>
              <div className="image-container">
                {console.log("items are", items)}
                <LandingPageItems items={items} />{" "}
              </div>
            </div>
          </>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
