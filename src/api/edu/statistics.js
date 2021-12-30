import request from '@/utils/request'

const api_name = '/rabbit/back/statistics-daily'

export default {
    //1 生成统计数据
    registerCount(date) {
        return request({
            url: `${api_name}/register-num/${date}`,
            method: 'post'
        })
    },
    //2 获取统计数据
    showData(statisticDailyReq) {
        return request({
            url: `${api_name}`,
            method: 'get',
            params: statisticDailyReq
        })
    }
}