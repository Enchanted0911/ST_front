import request from '@/utils/request'
export default {
    getBannerListPage(page, pageSize, bannerQuery) {
        return request({
            url: `/eduCms/bannerAdmin/pageBanner/${page}/${pageSize}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换json进行传递到接口里面
            data: bannerQuery
        })
    },
    deleteBannerById(id) {
        return request({
            url: `/eduCms/bannerAdmin/${id}`,
            method: 'delete'
        })
    },
    addBanner(banner) {
        return request({
            url: `/eduCms/bannerAdmin`,
            method: 'post',
            data: banner
        })
    },
    getBannerInfo(id) {
        return request({
            url: `/eduCms/bannerAdmin/${id}`,
            method: 'get'
        })
    },
    updateBannerInfo(banner) {
        return request({
            url: `/eduCms/bannerAdmin/`,
            method: 'put',
            data: banner
        })
    }
}