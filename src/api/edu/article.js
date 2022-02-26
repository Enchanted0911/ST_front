import request from '@/utils/request'

const api_name = '/rabbit/back/article'

export default {
    removeArticle(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },
    batchRemoveArticle(idList) {
        return request({
            url: `${api_name}/batch`,
            method: 'delete',
            data: idList
        })
    },
    pageArticle(articlePage) {
        return request({
            url: `${api_name}/page`,
            method: 'get',
            params: articlePage
        })
    },
    saveArticle(article) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: article
        })
    },
    updateArticle(article) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: article
        })
    },
    articleDetails(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    }
}