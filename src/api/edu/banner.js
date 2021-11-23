import request from '@/utils/request'

const api_name = '/rabbit/back/banner-management'

export default {
    pageBanner(bannerPage) {
        return request({
            url: `${api_name}/page`,
            method: 'get',
            data: bannerPage
        })
    },
    saveBanner(banner) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: banner
        })
    },
    removeBanner(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete',
        })
    },
    updateBanner(banner) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: banner
        })
    },
    bannerDetails(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    }
}