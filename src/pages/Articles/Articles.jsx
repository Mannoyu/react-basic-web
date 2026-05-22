import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '../../assets/error.png'
import { useState, useEffect } from 'react'
import { getPublishCategory } from '../../Apis/publish.jsx'
import { getList, deleteArticle } from '../../Apis/Articles.jsx'
import { useNavigate } from 'react-router-dom'



const { Option } = Select
const { RangePicker } = DatePicker
const Articles = () => {
  // 准备列数据
  const navigate = useNavigate()
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data.status]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/layout/create?id=${data.id}`)} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={
                () => onDelete(data)
              }
            />
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]
  const status = {
    1:
      <Tag color="green">待审核</Tag>,
    2:
      <Tag color="green">审核通过</Tag>

  }
  const [category, setCategory] = useState([])
  const [params, setParams] = useState({
    page: 1,
    per_page: 4,
    begin_pubdate: null,
    end_pubdate: null,
    status: null,
    channel_id: null
  })
  const [article, setArticleList] = useState({
    list: [],
    count: 0
  })





  const onFinish = values => {
    const { channel_id, date } = values
    let status = values.status === '' ? 1 : values.status
    setParams({
      ...params,
      status,
      channel_id,
      begin_pubdate: date[0].format('YYYY-MM-DD'),
      end_pubdate: date[1].format('YYYY-MM-DD'),
    })
    // 2. 使用参数获取新的列表
  }
  const pageChange = (e) => {
    setParams({
      ...params,
      page: e,
    })
  }

  const onDelete = async (data) => {
    const res = await deleteArticle(data)
    console.log(res)
    setParams({
      ...params,
      page: 1,
    })
  }
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getPublishCategory()
      console.log(res.data.channels)
      setCategory(res.data.channels)
    }
    const fetchList = async () => {
      const res = await getList(params)
      console.log(res.data.results)
      setArticleList({
        list: res.data.results,
        count: res.data.total_count
      })
    }
    fetchList()
    fetchCategory()
  }, [params])
  return (

    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {category.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <div>
        {/*        */}
        <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
          <Table rowKey="id" columns={columns} dataSource={article.list}
            pagination={{
              current: params.page,
              pageSize: params.per_page,
              onChange: pageChange,
              total: article.count
            }}
          />
        </Card>
      </div>
    </div>
  )
}
export default Articles
