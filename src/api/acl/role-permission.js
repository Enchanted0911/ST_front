import request from '@/utils/request'

const api_name = '/rabbit/acl/acl-role-permission'

export default {
    selectRolePermissionRelationShip(roleId) {
        return request({
            url: `${api_name}/${roleId}`,
            method: 'get'
        })
    },
    saveRolePermissionRelationShip(rolePermission) {
        return request({
            url: `${api_name}`,
            method: "post",
            data: rolePermission
        })
    }
}