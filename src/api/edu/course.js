import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduService/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduService/teacher/findAll',
            method: 'get'
        })
    },
    //根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/eduService/course/getCourseInfo/' + id,
            method: 'get'
        })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduService/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    //课程确认信息显示
    getPublishCourseInfo(id) {
        return request({
            url: '/eduService/course/getPublishCourseInfo/' + id,
            method: 'get'
        })
    },
    //课程最终发布
    publishCourse(id) {
        return request({
            url: '/eduService/course/publishCourse/' + id,
            method: 'post'
        })
    },
    deleteCourseId(id) {
        return request({
            url: `/eduService/course/${id}`,
            method: 'delete'
        })
    },
    //1 课程列表（条件查询分页）
    //current当前页 limit每页记录数 courseQuery条件对象
    getCourseListPage(current, limit, courseQuery) {
        return request({
            url: `/eduService/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            data: courseQuery
        })
    },
}