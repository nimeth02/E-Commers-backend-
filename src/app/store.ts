import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userslice'
import categoriesReducer from '../features/categoryslice'
import productReducer from '../features/productslice'
import sellReducer from '../features/sellslice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    categories:categoriesReducer,
    products:productReducer,
    sell:sellReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch