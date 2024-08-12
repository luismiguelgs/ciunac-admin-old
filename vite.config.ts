import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    build:{
        chunkSizeWarningLimit:1500,
        rollupOptions:{
            output:{
                manualChunks(id:string){
                    if (id.includes('node_modules')) {
                        if (id.includes('firebase')) {
                            return '@firebase';
                        }
                        if (id.includes('exceljs')) {
                            return '@exceljs';
                        }
                        
                        if (id.includes('@mui/material')){
                            return '@mui-material'
                        }
                        if (id.includes('@mui/icons-material')) {
                            return 'mui-icons';
                        }
                        if (id.includes('@mui/x-data-grid')) {
                            return 'mui-x-data-grid';
                        }
                        if(id.includes('@mui/x-date-pickers')){
                            return 'mui-x-date-pickers';
                        }
                        if (id.includes('@mui/x-charts')) {
                            return 'mui-x-charts';
                        }
                        if (id.includes('pdf')) {
                            return '@pdf-redenrer';
                        }
                    }
                }
            }
        },
    },
    plugins: [
        //splitVendorChunkPlugin(),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['favicon.ico', "apple-touch-icon.png", "masked-icon.svg"],
            manifest:{
                name:"Ciunac Certificados",
                short_name:"ciunac-certificados",
                description:"I am a simple vite app",
                theme_color:'#171717',
                icons:[
                {
                    src: '/android-chrome-192x192.png',
                    sizes:'192x192',
                    type:'image/png',
                    purpose:'favicon'
                },
                {
                    src:'/android-chrome-512x512.png',
                    sizes:'512x512',
                    type:'image/png',
                    purpose:'favicon'
                },
                {
                    src: '/apple-touch-icon.png',
                    sizes:'180x180',
                    type:'image/png',
                    purpose:'apple touch icon',
                },
                {
                    src: '/maskable_icon.png',
                    sizes:'512x512',
                    type:'image/png',
                    purpose:'any maskable',
                }],
                background_color:'#f0e7db',
                display:"standalone",
                scope:'/',
                start_url:"/",
                orientation:'portrait'
            }
        })
    ],
    resolve:{
        alias:{
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        }
    }
})
