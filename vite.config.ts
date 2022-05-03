import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        })
    ],
    envDir: "root",
    alias: {
        "@": resolve(__dirname, "src")
    },
    publicDir: "./public",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                admin: resolve(__dirname, "admin/index.html")
            }
        }
    },
    server: {
        port: 4000
    }
})
