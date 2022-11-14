
import { all } from 'redux-saga/effects';
import files from './files/saga';


function* gnsignSaga() {
	yield all([
		files()
	])
}

export default gnsignSaga