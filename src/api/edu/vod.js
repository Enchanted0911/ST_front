import request from '@/utils/request'

const api_name = '/rabbit/back/vod'

export default {
    removeAlyVideo(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    }
}