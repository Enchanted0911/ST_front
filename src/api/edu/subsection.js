import request from '@/utils/request'

const api_name = '/rabbit/back/course-subsection'

export default {
    gainCourseSubsection(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    },
    saveCourseSubsection(subsection) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: subsection
        })
    },
    updateCourseSubsection(subsection) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: subsection
        })
    },
    removeCourseSubsection(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    }
}