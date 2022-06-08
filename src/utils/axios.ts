import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import VueAxios from 'vue-axios'
import {ElMessage, ElNotification} from 'element-plus'
import nProgress from 'nprogress'
import {useRouter} from 'vue-router'

axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 6 * 1000,
    withCredentials: true
})

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

axios.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        nProgress.start()
        return request;
    }, ((error: any) => {
        ElNotification.error('请求错误！')
        return Promise.reject(error);
    }))

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        nProgress.done()
        switch (response.status as number) {
            case 401: {
                ElMessage.warning('请先登录')
                const router = useRouter()
                router.push('/login')
                break
            }
            case 403: {
                ElMessage.warning('拒绝访问')
                break
            }
        }
        return response;
    }, ((error: any) => {
        ElNotification.error('响应错误！')
        return Promise.reject(error);
    }))

export {axios, VueAxios}