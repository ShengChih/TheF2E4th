import { call, put, takeEvery } from 'redux-saga/effects';
import { SignPayload  } from './type.d'
import { createSign, saveDraft } from './reducer'

import {
	CREATE_SIGN,
	SAVE_SIGN,
	MODIFY_SIGN
} from './sagaActions'

function* makeSign(actions: SignPayload) {
	try {
		yield put(createSign(actions))
	} catch (e) {

	}
}

function* keepDraft(actions: SignPayload) {
	try {
		yield put(saveDraft(actions))
	} catch (e) {

	}
}

function* watchFilsSaga() {
	yield takeEvery(CREATE_SIGN, makeSign)
	yield takeEvery(SAVE_SIGN, makeSign)
}

export default watchFilsSaga