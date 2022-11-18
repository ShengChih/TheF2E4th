import { call, put, takeEvery } from 'redux-saga/effects';
import { SignPayload, SignBoxPayload } from './type.d'
import { createSign, saveDraft, saveSignBox, push2SignBox } from './reducer'

import {
	CREATE_DRAFT,
	SAVE_DRAFT,
	MODIFY_DRAFT,
	CREATE_SIGN,
	SAVE_SIGN,
	MODIFY_SIGN,
	SAVE_SIGN_BOX,
	ADD_NEW_TO_SIGN_BOX
} from './sagaActions'

function* saveDraft2State(actions: SignPayload) {
	try {
		yield put(saveDraft(actions.payload))
	} catch (e) {

	}
}

function* saveSign2State(actions: SignPayload) {
	try {
		yield put(createSign(actions.payload))
	} catch (e) {

	}
}

function* saveSignBox2State(actions: SignBoxPayload) {
	yield put(saveSignBox(actions.payload))
}

function* newSignPushBox(actions: SignPayload) {
	yield put(push2SignBox(actions.payload))
}

function* watchFilsSaga() {
	yield takeEvery(SAVE_DRAFT, saveDraft2State)
	yield takeEvery(SAVE_SIGN, saveSign2State)
	yield takeEvery(SAVE_SIGN_BOX, saveSignBox2State)
	yield takeEvery(ADD_NEW_TO_SIGN_BOX, newSignPushBox)
}

export default watchFilsSaga