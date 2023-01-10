import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';
import packageJson from '../package.json';
import { getEnv } from './utils/index.js';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    // 为index插入
    createHtmlPlugin({
      inject: {
        data: {
          title: getEnv('VITE_SYSTEM_NAME') // 项目标题
        }
      }
    })
  ],
  resolve: [
    {
      find: '@',
      replacement: resolve(__dirname, '../src')
    },
    {
      find: 'assets',
      replacement: resolve(__dirname, '../src/assets')
    }
  ],
  extensions: ['.js'], // 导入省略 .js 后缀
  define: {
    'process.env': {} // 将项目中 process.env 置为空
  },
  css: {
    // 全局使用自定义变量
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/assets/style/breakpoint.less')}";`
        },
        javascriptEnabled: true
      }
    }
  },
  base: `/${packageJson.name}/`
});
