
import { all } from 'redux-saga/effects'
import filesSaga from './files/saga'
import signsSaga from './signs/saga'
import historiesSaga from './histories/saga'


function* gnsignSaga() {
	yield all([
		filesSaga(),
		signsSaga(),
		historiesSaga()
	])
}

export default gnsignSaga