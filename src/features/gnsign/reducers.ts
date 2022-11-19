import { combineReducers } from 'redux'
import gnsignFiles from './files/reducer'
import gnsignSigns from './signs/reducer'
import gnsignHistories from './histories/reducer'

const gnsignReducers = combineReducers({
	gnsignFiles,
	gnsignSigns,
	gnsignHistories
})

export default gnsignReducers