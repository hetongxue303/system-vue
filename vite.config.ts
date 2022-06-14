import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import WindiCSS from 'vite-plugin-windicss'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

export default defineConfig({
    plugins: [
        vue(),
        // createSvgIconsPlugin({
        //     iconDirs: [path.resolve(process.cwd()), 'src/assets/icons/svg'],
        //     symbolId: 'icon-[dir]-[name]'
        // }),
        WindiCSS()
    ],
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
        open: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
})