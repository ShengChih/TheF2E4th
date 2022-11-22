import { put, takeEvery } from 'redux-saga/effects'
import { UploadFilePayload } from './type.d'
import { save, modify } from './reducer'

import { UPLOAD_FILE, MODIFY_DRAFT } from './sagaActions'

function* uploadLocal(actions: UploadFilePayload) {
  yield put(save(actions.payload))
}

function* saveDraft(actions: UploadFilePayload) {
  yield put(modify(actions.payload))
}

function* watchFilsSaga() {
  yield takeEvery(UPLOAD_FILE, uploadLocal)
  yield takeEvery(MODIFY_DRAFT, saveDraft)
}

export default watchFilsSaga
