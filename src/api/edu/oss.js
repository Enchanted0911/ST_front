import request from '@/utils/request'

const api_name = '/rabbit/back/oss'

export default {
    uploadOssFileTeachAvatar(file) {
        return request({
            url: `${api_name}/teachAvatar`,
            method: 'post',
            data: file
        })
    },
    uploadOssFileCourseCover(file) {
        return request({
            url: `${api_name}/courseCover`,
            method: 'post',
            data: file
        })
    },
    uploadOssFileBanner(file) {
        return request({
            url: `${api_name}/banner`,
            method: 'post',
            data: file
        })
    },
    uploadOssFileMember(id) {
        return request({
            url: `${api_name}/member`,
            method: 'post',
            data: file
        })
    }
}