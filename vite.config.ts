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