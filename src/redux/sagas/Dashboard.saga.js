import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchHomepageDashboard(action) {
  try {
    console.log("action payload length is", Object.keys(action.payload).length)
    //saving the axios get request to response
    console.log('fetch hazard payload: ', action.payload);
    if(Object.keys(action.payload).length >= 6){
      const response = yield axios.get("/api/dashBoard", {params: {filter: action.payload}});
      console.log("response is is is", response.data)
       //passing the response to my reducer
    yield put({ type: "SET_DASHBOARD", payload: response.data });

    }else{
       const response = yield axios.get("/api/dashBoard", {
      params: {
        userLatLng: action.payload
      }
    });

    //passing the response to my reducer
    yield put({ type: "SET_DASHBOARD", payload: response.data });

    }
  } catch (error) {
    console.log("dashboard get error is", error.data);
  }
}

function* deleteHazardItem(action) {
  try {
    yield axios.delete(`/api/hazard/${action.payload}`);

    yield put({
      type: "FETCH_HAZARD",
    });
    yield put({
      type: "FETCH_USER_HAZARD",
    });
  } catch (error) {
    console.log("delete item error is", error);
  }
}

function* fetchDashboard() {
  yield takeLatest("FETCH_HAZARD", fetchHomepageDashboard);
  yield takeLatest("DELETE_HAZARD_ITEM", deleteHazardItem);
}

export default fetchDashboard;
