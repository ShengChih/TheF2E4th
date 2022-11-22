import { put, takeEvery } from 'redux-saga/effects'
import { HistoryPayload } from './type.d'
import { saveFinishSignDocument } from './reducer'

import { SAVE_TO_HISTORY } from './sagaActions'

function* saveSignDodument2History(action: HistoryPayload) {
  yield put(saveFinishSignDocument(action.payload))
}

function* watchFilsSaga() {
  yield takeEvery(SAVE_TO_HISTORY, saveSignDodument2History)
}

export default watchFilsSaga
