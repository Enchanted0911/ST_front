import request from '@/utils/request'

const api_name = '/rabbit/acl/acl'


export function info() {
    return request({
        url: `${api_name}/info`,
        method: "get",
    })
}