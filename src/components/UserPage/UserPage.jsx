import React, { useState, useEffect } from "react";
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import LandingPageItems from "../LandingPageItems/LandingPageItems";
import { useHistory } from "react-router-dom";
import PageHeader from '../PageHeader/PageHeader';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

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


  return (
    <div className="container-fluid">
      <PageHeader 
      title = "My Account"
      description = "my account details"
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 me-lg-auto">
            <div className="card border-0 shadow mb-6 mb-lg-0">
              <div className="card-header bg-gray-100 py-4 border-0 text-center">
                <a class="d-inline-block" href="#">
                  <img class="d-block avatar avatar-xxl p-2 mb-2" src="https://d19m59y37dris4.cloudfront.net/directory/2-0-1/img/avatar/avatar-10.jpg" alt=""></img></a>
                <h2>Welcome, {user.username}!</h2>
              </div>
              <div className="card-body">
                <p>Your ID is: {user.id}</p>
              </div>
              <div className="card-footer">
                <LogOutButton className="btn btn-primary" />
              </div>
            </div>
          </div>
          <div className="col-lg-9 ps-lg-5">
            <div className="row">
              {dashBoard.length > 0 ? (
                dashBoard.map((items, i) => (
                  <>
                    <div className="col-sm-6">
                      <div className="card min-height-400" key={i}>
                        <div className="row no-gutters">
                          <div className="image-container">
                            <img src={items.image} alt="" onClick={() => getCardInfo(items.id)}/>
                          </div>
                          {console.log("items are", items)}
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
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
