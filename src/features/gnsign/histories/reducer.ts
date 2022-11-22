import { createSlice } from '@reduxjs/toolkit'
import { HistoryState } from './type.d'

const initialState: HistoryState = {
  history: [],
}

export const signsSlice = createSlice({
  name: 'history',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveFinishSignDocument: (state, action) => {
      state.history.splice(0, 0, action.payload)
    },
  },
})

export const { saveFinishSignDocument } = signsSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default signsSlice.reducer
