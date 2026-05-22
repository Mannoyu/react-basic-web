import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
const { Header, Sider } = Layout
import { fetchInfo } from '../../stores/userInfo.jsx'
import { useSelector } from 'react-redux'
import { removeUserInfo } from '../../stores/userInfo.jsx'
import { useLocation } from 'react-router-dom'

const items = [
  {
    label: '首页',
    key: '/layout/home',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/layout/articles',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/layout/create',
    icon: <EditOutlined />,
  },
]


const GeekLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const userInfo = useSelector((state) => state.user.userInfo)
  const [selectedKey, setSelectedKey] = useState(location.pathname)
  const menuClick = (key) => {
    navigate(key.key)
    setSelectedKey(key.key)
  }
  useEffect(() => {
    dispatch(fetchInfo())
    setSelectedKey(location.pathname)
  }, [dispatch, location.pathname])

  const logout = () => {
    dispatch(removeUserInfo())
    navigate('/')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={logout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            onClick={menuClick}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
