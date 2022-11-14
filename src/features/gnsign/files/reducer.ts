import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilesState } from './type.d'

const initialState: FilesState = {
  origin: new Blob(),
	draft: new Blob()
}

export const filesSlice = createSlice({
  name: 'files',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
		upload: (state, action) => {
			state.origin = action.payload
		},
		modify: (state, action) => {
			state.draft = action.payload
		}
  },
})

export const { upload, modify } = filesSlice.actions

// Other code such as selectors can use the imported `RootState` type


export default filesSlice.reducer