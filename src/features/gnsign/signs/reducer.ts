import { createSlice } from '@reduxjs/toolkit'
import { SignsState } from './type.d'

const initialState: SignsState = {
  sign: '',
  draft: '',
  signBox: [],
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
    saveSignBox: (state, action) => {
      state.signBox = action.payload
    },
    push2SignBox: (state, action) => {
      state.signBox.push(action.payload)
    },
  },
})

export const { createSign, saveDraft, saveSignBox, push2SignBox } = signsSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default signsSlice.reducer
