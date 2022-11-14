import { call, put, takeEvery } from 'redux-saga/effects';
import { UploadFilePayload  } from './type.d'

import {
	UPLOAD_FILE,
	DOWNLOAD_FILE,
	MODIFY_FILE
} from './action'

function* uploadLocal({ payload }: UploadFilePayload) {
	yield put({ type: UPLOAD_FILE, payload })
}

function* watchFilsSaga() {
	yield takeEvery(UPLOAD_FILE, uploadLocal)
}

export default watchFilsSaga