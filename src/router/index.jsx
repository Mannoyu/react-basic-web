import { createBrowserRouter } from 'react-router-dom'
import GeekLayout from '../pages/Layout/Layout.jsx'
import Home from '../pages/Home/Home.jsx'
import Articles from '../pages/Articles/Articles.jsx'
import Publish from '../pages/Publish/Publish.jsx'

import Login from '../pages/Login/Login.jsx'
import AuthRoute from '../components/AuthRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Login />
    ),
  },
  {
    path: '/layout',
    element: (
      <AuthRoute>
        <GeekLayout />
      </AuthRoute>
    ),
    children: [
      {
        path: '/layout/home',
        element: <Home />,
      },
      {
        path: '/layout/articles',
        element: <Articles />,
      },
      {
        path: '/layout/create',
        element: <Publish />,
      },
    ],
  }
])
export default router
