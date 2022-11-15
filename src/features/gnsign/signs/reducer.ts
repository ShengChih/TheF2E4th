import { createSlice } from '@reduxjs/toolkit'
import { SignsState } from './type.d'

const initialState: SignsState = {
  sign: '',
  draft: '',
}

export const signsSlice = createSlice({
  name: 'signs',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
		createSign: (state, action) => {
			state.sign = action.payload
		},
    saveDraft: (state, action) => {
			state.draft = action.payload
		},
  },
})

export const { createSign, saveDraft } = signsSlice.actions

// Other code such as selectors can use the imported `RootState` type


export default signsSlice.reducer