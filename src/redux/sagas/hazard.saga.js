import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addHazard(action) {
  console.log('payload is ', action.payload);
  try {
    if (!action.payload.id) {
      yield axios.post('/api/hazard', action.payload);
    }
    else {
      yield axios.put(`/api/hazard/${action.payload.id}`, action.payload);
    }
  }
  catch (error) {
    console.log('add/put hazard request failed', error);
  }
}

function* fetchHazardToEdit(action) {
  try {
    let response = yield axios.get(`/api/hazard/${action.payload}`);

    yield put({
      type: 'SET_HAZARD_TO_EDIT',
      payload: response.data
    });
  } 
  catch (error) {
    console.log('fetch hazard to edit failed', error);
  }
}

function* hazardSaga() {
  yield takeLatest('ADD_EDIT_HAZARD', addHazard);
  yield takeLatest('FETCH_HAZARD_TO_EDIT', fetchHazardToEdit)
}

export default hazardSaga;