import request from '@/utils/request'

const api_name = '/rabbit/acl/acl-permission'

export default {
    gainAllPermission() {
        return request({
            url: `${api_name}/all`,
            method: 'get'
        })
    },
    gainMenuInfo() {
        return request({
            url: `${api_name}/menu`,
            method: "get",
        })
    },
    deletePermission(id) {
        return request({
            url: `${api_name}/${id}`,
            method: "delete"
        })
    },
    savePermission(permission) {
        return request({
            url: `${api_name}`,
            method: "post",
            data: permission
        })
    },
    updatePermission(permission) {
        return request({
            url: `${api_name}`,
            method: "put",
            data: permission
        })
    },
    gainPermissionInfo() {
        return request({
            url: `${api_name}`,
            method: "get",
        })
    }
}