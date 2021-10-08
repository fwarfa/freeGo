import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchHomepageDashboard() {
  try {
    //saving the axios get request to response
    const response = yield axios.get("/api/dashBoard");

    //log response to the console.
    console.log("dashBoard get response is", response.data);

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
  } catch (error) {
    console.log("delete item error is", error);
  }
}

function* fetchDashboard() {
  yield takeLatest("FETCH_HAZARD", fetchHomepageDashboard);
  yield takeLatest("DELETE_HAZARD_ITEM", deleteHazardItem);
}

export default fetchDashboard;
