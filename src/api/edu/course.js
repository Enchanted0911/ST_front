import request from '@/utils/request'

const api_name = '/rabbit/back/course'

export default {
    gainCourseOutline(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get',
        })
    },
    pageCourse(coursePage) {
        return request({
            url: `${api_name}`,
            method: 'get',
            data: coursePage
        })
    },
    saveCourseBaseInfo(courseBaseInfo) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: courseBaseInfo
        })
    },
    gainCourseBaseInfo(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get',
        })
    },
    updateCourseBaseInfo(courseBaseInfo) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: courseBaseInfo
        })
    },
    gainCoursePublishInfo(id) {
        return request({
            url: `${api_name}/publish-info/${id}`,
            method: 'get'
        })
    },
    publishCourse(id) {
        return request({
            url: `${api_name}/publish-info/${id}`,
            method: 'put'
        })
    },
    removeCourse(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },
}