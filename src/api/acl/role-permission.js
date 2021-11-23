import request from '@/utils/request'

const api_name = '/rabbit/acl/acl-role-permission'

export default {
    toAssign(roleId) {
        return request({
            url: `${api_name}/${roleId}`,
            method: 'get'
        })
    },
    doAssign(roleId, permissionId) {
        return request({
            url: `${api_name}`,
            method: "post",
            params: { roleId, permissionId }
        })
    }
}