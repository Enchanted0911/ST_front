import request from '@/utils/request'

const api_name = '/rabbit/acl/acl-role'

export default {

    pageRole(rolePage) {
        return request({
            url: `${api_name}/page`,
            method: 'get',
            data: rolePage // url查询字符串或表单键值对
        })
    },
    roleDetails(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    },

    saveRole(role) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: role
        })
    },

    updateRole(role) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: role
        })
    },
    removeRole(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },
    removeBatchRole(idList) {
        return request({
            url: `${api_name}`,
            method: 'delete',
            data: idList
        })
    }

}