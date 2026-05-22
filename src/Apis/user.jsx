import { http } from '../utils/index.jsx';

export const getUserToken = (data) => {
  return http({
    url: '/authorizations',
    method: 'Post',
    data
  })
}

export const getUserInfo = () => {
  return http({
    url: '/user/profile',
    method: 'Get'
  })
}
