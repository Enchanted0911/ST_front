import request from '@/utils/request'

const api_name = '/rabbit/back/teacher'

export default {
    listTeacher() {
        return request({
            url: `${api_name}`,
            method: 'get'
        })
    },
    removeTeacher(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },
    pageTeacher(teacherPage) {
        return request({
            url: `${api_name}/page`,
            method: 'get',
            data: teacherPage
        })
    },
    saveTeacher(teacher) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: teacher
        })
    },
    updateTeacher(teacher) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: teacher
        })
    },
    teacherDetails(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    }
}