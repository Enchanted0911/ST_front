import request from '@/utils/request'

const api_name = '/rabbit/back/subject'

export default {
    saveSubjectByExcel(file) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: file
        })
    },
    gainSubject() {
        return request({
            url: `${api_name}`,
            method: 'get'
        })
    }
}