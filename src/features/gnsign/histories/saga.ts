import { call, put, takeEvery } from 'redux-saga/effects';
import { HistoryPayload } from './type.d'
import { saveFinishSignDocument } from './reducer'

import {
	GET_FROM_HISTORY,
	SAVE_TO_HISTORY,
	FILTER_HISTORY,
	OPEN_HISTORY_FILE
} from './sagaActions'

function* getLatestHistory() {

}

function* saveSignDodument2History(action: HistoryPayload) {
	yield put(saveFinishSignDocument(action.payload))
}

function* filterHistoryBox() {

}

function* openDocumentFromHistory() {

}

function* watchFilsSaga() {
	yield takeEvery(GET_FROM_HISTORY, getLatestHistory)
	yield takeEvery(SAVE_TO_HISTORY, saveSignDodument2History)
	yield takeEvery(FILTER_HISTORY, filterHistoryBox)
	yield takeEvery(OPEN_HISTORY_FILE, openDocumentFromHistory)
}

export default watchFilsSaga