import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import { getPublishCategory, publishArticle, getArticleDetail } from '../../Apis/publish.jsx'
import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'



const { Option } = Select

const Publish = () => {
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const cacheImageList = useRef([])
  const [categoryList, setCategoryList] = useState([])
  const [imageList, setImageList] = useState([])
  const [imageType, setImageType] = useState(1)
  const [form] = Form.useForm()
  const onFinish = async (formValue) => {
    if (imageList.length !== imageType) {
      return
    }
    const { channel_id, content, title } = formValue
    const formatUrl = (list) => {
      return list.map(item => {
        if (item.response) {
          return item.response.data.url
        } else {
          return item.url
        }
      })
    }
    const params = {
      channel_id,
      content,
      title,
      type: imageType,
      cover: {
        type: imageType,
        images: formatUrl(imageList)
      }
    }
    const res = await publishArticle(params)
    console.log(res)

  }

  const onChange = (value) => {
    setImageList(value.fileList)
    cacheImageList.current = value.fileList
  }

  const onChangeImageType = (value) => {
    console.log(value.target.value)
    setImageType(value.target.value)
    if (value.target.value === 1) {

      setImageList([cacheImageList.current[0] || {}])
      console.log('切换到了1')
    }
    else if (value.target.value === 3) {
      setImageList(cacheImageList.current)
    }
    else {
      setImageList([])
    }


  }
  useEffect(() => {
    if (articleId) {
      const getDetail = async () => {
        const res = await getArticleDetail(articleId)
        console.log(res)
        const { cover, ...formValue } = res.data
        // 设置表单数据
        setImageType(cover.type)
        form.setFieldsValue({ ...formValue, type: cover.type })
        setImageList(cover.images.map(url => ({ url })))
        cacheImageList.current = cover.images.map(url => ({ url }))
      }
      getDetail()
    }
    const getPublishCategoryList = async () => {
      const res = await getPublishCategory()
      console.log(res)
      setCategoryList(res.data.channels)
    }
    getPublishCategoryList()

  }, [articleId, form])



  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: articleId ? '编辑文章' : '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {categoryList.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onChangeImageType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              name="image"
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onChange}
              maxCount={imageType}
              multiple={imageType > 1}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <Input.TextArea placeholder="请输入文章内容" style={{ width: 400, height: 100 }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit" >
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish