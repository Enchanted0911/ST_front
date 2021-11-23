import request from '@/utils/request'

const api_name = '/rabbit/back/course-chapter'

export default {
    //1 根据课程id获取章节和小节数据列表
    saveChapter(chapter) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: chapter
        })
    },
    //添加章节
    updateChapter(chapter) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: chapter
        })
    },
    //根据id查询章节
    deleteChapter(chapterId) {
        return request({
            url: `${api_name}/${chapterId}`,
            method: 'delete'
        })
    },
    //修改章节
    chapterDetails(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    }
}