
import { all } from 'redux-saga/effects';
import filesSaga from './files/saga';
import signsSaga from './signs/saga';


function* gnsignSaga() {
	yield all([
		filesSaga(),
		signsSaga()
	])
}

export default gnsignSaga