import { combineReducers } from 'redux'
import gnsignFiles from './files/reducer'
import gnsignSigns from './signs/reducer'

const gnsignReducers = combineReducers({
	gnsignFiles,
	gnsignSigns
})

export default gnsignReducers