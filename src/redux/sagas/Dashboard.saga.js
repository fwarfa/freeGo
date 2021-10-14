import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchHomepageDashboard(action) {
  try {
    console.log("action payload length is", Object.keys(action.payload).length)
    //saving the axios get request to response
    console.log('fetch hazard payload: ', action.payload);
  
       const response = yield axios.get("/api/dashBoard", {
      params: {
        filterParams: action.payload
      }
    });
    //passing the response to my reducer
    yield put({ type: "SET_DASHBOARD", payload: response.data });

  
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
function* fetchHAzardGenre () {
  try {
    const response = yield axios.get("/api/dashBoard/hazard_genre")

    console.log("get hazard response is", response.data)

    yield put({type:"SET_HAZARD_GENRE", payload: response.data})
    
  } catch (error) {
     console.log('GET Hazard Genre request failed', error);
  }
}

function* fetchDashboard() {
  yield takeLatest("FETCH_HAZARD", fetchHomepageDashboard);
  yield takeLatest("DELETE_HAZARD_ITEM", deleteHazardItem);
    yield takeLatest("FETCH_HAZARD_GENRE", fetchHAzardGenre)
}

export default fetchDashboard;
