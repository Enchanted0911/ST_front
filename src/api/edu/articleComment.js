import request from '@/utils/request'

const api_name = '/rabbit/back/article-comment'

export default {
    removeArticleComment(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },
    batchRemoveArticleComment(idList) {
        return request({
            url: `${api_name}/batch`,
            method: 'delete',
            data: idList
        })
    },
    pageArticleComment(articleCommentPage) {
        return request({
            url: `${api_name}/page`,
            method: 'get',
            params: articleCommentPage
        })
    }
}