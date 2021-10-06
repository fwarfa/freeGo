import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addHazard(action) {
  try {
    yield axios.post('/api/hazard', action.payload);

    // yield put({ type: 'FETCH_hazard'});
  } catch (error) {
    console.log('add hazard post request failed', error);
  }
}

function* fetchHazardToEdit(action) {
  try {
    let response = yield axios.get(`/api/hazard/${action.payload}`);

    yield put({
      type: 'SET_HAZARD_TO_EDIT',
      payload: response.data
    })
  } catch (error) {
    
  }
}

function* hazardSaga() {
  yield takeLatest('ADD_HAZARD', addHazard);
  yield takeLatest('FETCH_HAZARD_TO_EDIT', fetchHazardToEdit)
}

export default hazardSaga;