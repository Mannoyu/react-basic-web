import { createSlice } from '@reduxjs/toolkit'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/index.jsx';
import { getUserToken, getUserInfo } from '../Apis/user.jsx';

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getLocalStorage('token') || '',
    userInfo: {}
  },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload
      setLocalStorage('token', action.payload)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    removeUserInfo: (state) => {
      state.userInfo = {}
      removeLocalStorage('token')
    }
  }

})
const { setUserToken, setUserInfo, removeUserInfo } = userStore.actions
const reducer = userStore.reducer

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await getUserToken(loginForm)
    dispatch(setUserToken(res.data.token))
  }
}

const fetchInfo = () => {
  return async (dispatch) => {
    const res = await getUserInfo()
    dispatch(setUserInfo(res.data))
    //console.log(res.data)
  }
}
export {
  fetchLogin,
  fetchInfo,

}



export { setUserToken, removeUserInfo }
export default reducer
