import { http } from '../utils/index.jsx';
export const getPublishCategory = () => {
  return http({
    url: '/channels',
    method: 'GET'
  })
}
export const publishArticle = (data) => {
  return http({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}
export const getArticleDetail = (articleId) => {
  return http({
    url: `/mp/articles/${articleId}`,
    method: 'GET'
  })
}