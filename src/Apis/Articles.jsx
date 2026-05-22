import { http } from '../utils/index.jsx';
export const getList = async (params) => {
  return http({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}
export const deleteArticle = async (data) => {
  return http({
    url: `/mp/articles/${data.id}`,
    method: 'DELETE',
  })
}
