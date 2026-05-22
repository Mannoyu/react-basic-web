import { getLocalStorage } from '../utils/index.jsx';
import { Navigate } from 'react-router-dom';
const AuthRoute = ({ children }) => {
  const token = getLocalStorage('token')
  if (token) {
    return <>
      {children}
    </>
  }
  else {
    return <Navigate to='/' />
  }
}
export default AuthRoute
