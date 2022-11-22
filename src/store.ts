import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import GnsignReducers from '@/features/gnsign/reducers'
import GnsignSagas from '@/features/gnsign/sagas'

const sagaMiddleware = createSagaMiddleware()

const devMode = process.env.NODE_ENV === 'development'
const middleware = devMode ? [sagaMiddleware] : [sagaMiddleware]

const store = configureStore({
  reducer: GnsignReducers,
  devTools: devMode,
  middleware: middleware,
})
sagaMiddleware.run(GnsignSagas)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
