import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addHazzard(action) {
  try {
    yield axios.post('/api/hazzard', action.payload);

    // yield put({ type: 'FETCH_HAZZARD'});
  } catch (error) {
    console.log('add hazzard post request failed', error);
  }
}

function* hazzardSaga() {
  yield takeLatest('ADD_HAZZARD', addHazzard);
}

export default hazzardSaga;