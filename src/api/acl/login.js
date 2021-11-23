import request from '@/utils/request'

// 登录
export function login(username, password) {
    // debugger
    return request({
        url: '/rabbit/acl/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
// 登出
export function logout() {
    //debugger
    return request({
        url: '/rabbit/acl/logout',
        method: 'post'
    })
}