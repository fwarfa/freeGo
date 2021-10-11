import React from 'react';
import { useInterval } from '../../hooks/useInterval';
import { useDispatch, useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";

function Notification() {
  const dispatch = useDispatch();
  const dashBoard = useSelector((store) => store.dashBoardReducer);

  useInterval(async () => {
    console.log('check if data is ready');
    dispatch({
      type: "FETCH_HAZARD",
    });
  }, 10000)

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
