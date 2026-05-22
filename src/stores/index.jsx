import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userInfo'

const store = configureStore({
  reducer: {
    user: userReducer
  }
})
export default store