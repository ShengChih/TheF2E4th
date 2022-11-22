import { createSlice } from '@reduxjs/toolkit'
import { FilesState } from './type.d'

const initialState: FilesState = {
  origin: undefined,
  draft: undefined,
}

export const filesSlice = createSlice({
  name: 'files',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    save: (state, action) => {
      state.origin = action.payload
      state.draft = action.payload
    },
    modify: (state, action) => {
      state.draft = action.payload
    },
  },
})

export const { save, modify } = filesSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default filesSlice.reducer
