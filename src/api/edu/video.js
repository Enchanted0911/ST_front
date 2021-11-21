import request from '@/utils/request'
export default {

    //根据id查询小节
    getVideo(videoId) {
        return request({
            url: '/eduService/video/getVideoInfo/' + videoId,
            method: 'get'
        })
    },
    //添加小节
    addVideo(video) {
        return request({
            url: '/eduService/video/addVideo',
            method: 'post',
            data: video
        })
    },
    //修改小节
    updateVideo(video) {
        return request({
            url: '/eduService/video/updateVideo',
            method: 'post',
            data: video
        })
    },

    //删除小节
    deleteVideo(id) {
        return request({
            url: '/eduService/video/' + id,
            method: 'delete'
        })
    },
    //删除视频
    deleteAlyVod(id) {
        return request({
            url: '/eduVod/video/removeAlyVideo/' + id,
            method: 'delete'
        })
    }
}