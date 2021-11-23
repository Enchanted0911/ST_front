import request from '@/utils/request'

const api_name = '/rabbit/acl/acl-user-role'

export default {
    gainRoleInfoByUserId(roleId) {
        return request({
            url: `${api_name}/${roleId}`,
            method: 'get'
        })
    },
    assignRoleToUser(userRole) {
        return request({
            url: `${api_name}`,
            method: "post",
            data: userRole
        })
    }
}