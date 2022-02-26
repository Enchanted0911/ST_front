import request from '@/utils/request'

const api_name = '/rabbit/back/article-content'

export default {
    updateArticleContent(articleContent) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: articleContent
        })
    },
    articleContentDetails(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    }
}