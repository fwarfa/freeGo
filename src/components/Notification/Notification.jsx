import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";


/**
 * Notifications Component
 * This component renders our hazard list in a list format / non card
 */

function Notification() {
  const dashBoard = useSelector((store) => store.dashBoardReducer);
  const getCardInfo = (id) => {
    console.log("card info id is", id);
    history.push(`/details/${id}`)
  }

  return (
    <div className="container">
      <div className="row">
        {dashBoard.length > 0 ? (
          dashBoard.map((items, i) => (
            <>
              <div className="col-sm-6">
                <div className="card min-height-400" key={i}>
                  <div className="row no-gutters">
                    <div className="image-container col-sm-4">
                      <img src={items.image} alt="" onClick={() => getCardInfo(items.id)}/>
                    </div>
                    <LandingPageItems items={items} />{" "}
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Notification;
