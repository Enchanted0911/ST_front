import request from '@/utils/request'

const api_name = '/rabbit/acl/acl-user'

export default {

    userDetails(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get',
        })
    },
    saveAclUser(aclUser) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: aclUser
        })
    },

    pageUser(userPage) {
        return request({
            url: `${api_name}/page`,
            method: 'get',
            params: userPage
        })
    },

    updateUser(user) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: user
        })
    },
    removeUser(userId) {
        return request({
            url: `${api_name}/${userId}`,
            method: 'delete'
        })
    },
    removeBatchUser(userIdList) {
        return request({
            url: `${api_name}`,
            method: 'delete',
            data: userIdList
        })
    }
}