import { call, put, takeEvery } from 'redux-saga/effects';
import { UploadFilePayload  } from './type.d'
import { save, modify } from './reducer'

import {
	UPLOAD_FILE,
	DOWNLOAD_FILE,
	MODIFY_FILE
} from './sagaActions'

function* uploadLocal(actions: UploadFilePayload) {
	try {
		yield put(save(actions.payload))
	} catch (e) {

	}
}

function* watchFilsSaga() {
	yield takeEvery(UPLOAD_FILE, uploadLocal)
}

export default watchFilsSaga