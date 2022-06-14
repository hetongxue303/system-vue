# 通用后台系统

## 初始化

- 创建项目

```shell
npm init vite@latest system-vue -- --template vue-ts
```

- 安装初始依赖

```shell
cd system-vue
npm install
npm run dev
```

## 相关配置

### vite

- 安装`@types/node`

```shell
npm install @types/node -D
```

- 添加配置

```ts
//  vite.config.ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path"

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
            "@assets": path.join(__dirname, "src/assets"),
            "@components": path.join(__dirname, "src/components"),
            "@views": path.join(__dirname, "src/views"),
            "@utils": path.join(__dirname, "src/utils")
        }
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        cors: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
})
```

> 解决打包错误`package.json`

```json
{
  "script": {
    "build": "vue-tsc --noEmit --skipLibCheck && vite build"
  }
}
```

### typescript

> 添加如下配置`tsconfig.json`

```json
{
  "compilerOptions": {
    "types": [
      "vite/client"
    ]
  },
  "noImplicitAny": true,
  "noImplicitThis": true,
  "strictNullChecks": true,
  "skipLibCheck": true,
  "suppressImplicitAnyIndexErrors": true,
  "baseUrl": ".",
  "paths": {
    "@": [
      "./src"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}

```

### less/sass

```shell
# less
npm install less less-loader -D
# sass
npm install sass sass-loader -D
```

### vue-router

- 安装

```shell
npm install vue-router@4
```

- 配置

```ts
//  src/router/index.ts
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(() => {
})

export default router
```

- 使用

```ts
// main.ts
import {createApp} from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.use(router)
    .mount('#app')
```

### nProgress

- 安装

```shell
npm install nprogress --save
```

- 配置

```ts
// 在src/router/index.ts中添加下列配置
router.beforeEach((to, from, next) => {
    nProgress.start()
    next()
})

router.afterEach(() => {
    nProgress.done()
})

nProgress.configure({
    ease: 'linear',
    speed: 500,
    showSpinner: false  // 是否使用进度环
})

// 在mian.ts中引入样式
import 'nprogress/nprogress.css'
```

- 配置进度条颜色

```vue
// App.vue
<style>
/*设置进度条颜色  不配置时为默认颜色*/
#nprogress .bar {
  background: red !important;
}
</style>
```

> 解决引用错误问题

```ts
//  在env.d.ts中添加
declare module 'nprogress'
```

### element plus

- 安装

```shell
# element plus
npm install element-plus --save
# element plus icon
npm install @element-plus/icons-vue
```

- 配置

```ts
// src/plugins/element-plus.ts
import {App} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from '@element-plus/icons-vue'

export default {
    install(app: App) {
        app.use(ElementPlus, {
            locale,
            size: 'small' || 'default' || 'large'
        })
        Object.keys(Icons).forEach((key: string) => {
            app.component(key, Icons[key as keyof typeof Icons]);
        })
    }
}
```

- 使用

```ts
// main.ts
import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from './plugins/element-plus'

const app = createApp(App)

app.use(ElementPlus)
    .mount('#app')
```

### style

#### global.scss

> 新建`src\assets\style\global.scss`样式文件

```scss
/*全局公共样式表*/
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  a {
    text-decoration: none;
    color: #333;
  }

  ul, li {
    list-style: none;
  }

}

/*设置滚动条样式*/
::-webkit-scrollbar {
  width: 5px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(26, 25, 25, 0.3);
  background-color: rgba(0, 0, 0, 0.1);
}

/*设置进度条颜色  不配置时为默认颜色*/
#nprogress .bar {
  /*background: rgba(41, 236, 127, 0.5) !important;*/
}
```

- 使用

```vue
//  APP.vue
@import 'assets/style/global.scss';
```

#### reset.css

- 安装

```shell
npm install reset.css --save
```

- 使用

```vue
// APP.vue
@import 'reset.css';
```

#### animate.css

- 安装

```shell
npm install animate.css --save
```

- 使用

```vue
// APP.vue
@import 'animate.css';
```

> 通过class [使用详情](https://animate.style/)

```html
<h1 class="animate__animated animate__bounce">An animated element</h1>
```

#### windi css

官网：[Windi Css](https://cn.windicss.org/)

- 安装

```shell
npm install -D vite-plugin-windicss windicss
```

- 配置

```ts
//  在vite.config.ts中添加下列配置
import WindiCSS from 'vite-plugin-windicss'

export default {
    plugins: [
        WindiCSS(),
    ],
}

// 在main.ts中引入样式文件
import 'virtual:windi.css'
```

- 使用

[使用详情](https://cn.windicss.org/utilities/general/colors.html)

### axios

- 安装

```shell
npm install axios vue-axios --save
```

- 配置

```ts
// src/utils/axios.ts
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
```

- 使用

```ts
//  main.ts
import {createApp} from 'vue'
import App from './App.vue'
import {axios, VueAxios} from './utils/axios'

const app = createApp(App)

app.use(VueAxios, axios)
    .mount('#app')
```

### pinia

- 安装

```shell
npm install pinia
```

- 配置

```ts
//  store/index.ts
import {defineStore} from 'pinia'

interface storeTypes {
}

export const useMainStore = defineStore('main', {
    // 存储全局状态
    state: (): storeTypes => {
        return {}
    },

    // 封装计算属性 具有缓存功能
    getters: {},

    // 封装业务逻辑 修改state
    actions: {}
})
```

- 使用

```ts
//  main.ts
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'

const app = createApp(App)

app.use(createPinia())
    .mount('#app')
```

## 其他插件

### qs

- 安装

```shell
npm install qs
```

- 使用

```ts
import * as qs from 'qs'
```

> 解决引用报红

```ts
//  env.d.ts
declare module 'qs'
```

### cookie

- 安装

```shell
# 由于universal-cookie依赖于vueuse/integrations 故需要安装
npm install @vueuse/integrations
# cookie依赖安装
npm install universal-cookie
```

- 使用

```ts
import {useCookies} from '@vueuse/integrations/useCookies'
```

### svgIcon

- 安装

```shell
npm install vite-plugin-svg-icons -D
```

- 配置

```ts
//  vite.config.ts
import {defineConfig} from 'vite'
import * as path from 'path'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

export default defineConfig({
    plugins: [
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd()), 'src/assets/icons/svg'],
            symbolId: 'icon-[dir]-[name]'
        })
    ]
})
```

> ts.config.json

```json
{
  "compilerOptions": {
    "types": [
      "vite-plugin-svg-icons/client"
    ]
  }
}
```

- 创建组件

```vue
// src/components/SvgIcon/Index.vue
<template>
  <svg aria-hidden="true" class="svg-icon" :width="size" :height="size">
    <use :xlink:href="symbolId" rel="external nofollow" :fill="color"/>
  </svg>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  prefix: {type: String, default: 'icon'},
  name: {type: String, required: true},
  color: {type: String, default: ''},
  size: {type: String, defalut: '1em'}
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

</script>

<style scoped lang="scss">
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
```

- 注册

```ts
import {createApp} from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.component('svg-icon', () => import('./components/SvgIcon/Index.vue')).mount('#app')
```

- 使用

```html

<svg-icon name="bug"/>
```