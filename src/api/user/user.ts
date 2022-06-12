import {axios} from '../../utils/axios'
import {loginEntity} from './types'
import * as qs from 'qs'


// 获取验证码
export const getVerify = () => {
    return axios({
        method: 'GET',
        url: '/api/getVerify'
    })
}

// 登录处理
export const login = (data: loginEntity) => {
    return axios({
        method: 'POST',
        url: '/api/loginCheck',
        data: qs.stringify(data)
    })
}