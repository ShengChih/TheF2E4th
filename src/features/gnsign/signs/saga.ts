import { call, put, takeEvery } from 'redux-saga/effects';
import { SignPayload  } from './type.d'
import { createSign, saveDraft } from './reducer'

import {
	CREATE_DRAFT,
	SAVE_DRAFT,
	MODIFY_DRAFT,
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

function* saveDraft2State(actions: SignPayload) {
	try {
		yield put(saveDraft(actions))
	} catch (e) {

	}
}

function* saveSign2State(actions: SignPayload) {
	try {
		yield put(createSign(actions))
	} catch (e) {

	}
}

function* watchFilsSaga() {
	yield takeEvery(SAVE_DRAFT, saveDraft2State)
	yield takeEvery(SAVE_SIGN, saveSign2State)
}

export default watchFilsSaga