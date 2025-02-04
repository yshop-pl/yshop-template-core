import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import liveReload from 'vite-plugin-live-reload';

export default defineConfig({
    plugins: [
        vue(),
        liveReload(['./src/**/*.{js,ts,vue,css}'])
    ],
    build: {
        manifest: "manifest.json",
        outDir: './build'
        // rollupOptions: {
        //     input: {
        //         js: './src/app.js'
        //     },
        //     output: {
        //         entryFileNames: `app.js`,
        //         chunkFileNames: 'app.js',
        //         assetFileNames: (chunkInfo => {
        //             if (/\.(css)$/.test(chunkInfo.name ?? '')) {
        //                 return '[name].[ext]';
        //             }
        //             return '[name].[ext]';
        //         })
        //     }
        // }
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            '@': '/src'
        }
    }
})
// export default ({ mode }) => {
//     return defineConfig({
//         plugins: [
//             vue(),
//             liveReload([
//                 __dirname + '/resources/**/*.*',
//             ]),
//         ],
//         base: './',
//         build: {
//             manifest: "manifest.json",
//             outDir: 'public/resources/',
//             rollupOptions: {
//                 input: {
//                     js: './resources/js/app.js'
//                 },
//                 output: {
//                     entryFileNames: `js/app.js`,
//                     /* assetFileNames: `[ext]/app.[ext]`, */
//                     assetFileNames: ({name}) => {
//
//                         if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
//                             return 'images/[name].[ext]';
//                         }
//
//                         if (/\.css$/.test(name ?? '')) {
//                             return 'css/app.[ext]';
//                         }
//
//                         return '[name].[ext]';
//                     },
//                 },
//             },
//         },
//         resolve: {
//             alias: {
//                 vue: 'vue/dist/vue.esm-bundler.js'
//             }
//         }
//     })
// }