# 前端脚手架文档

> 当前项目基于 vue3,vite4,naiveui等技术，以及集成公司内部全套机构、科室、角色、权限控制等的全套后台解决方案

## 如何以前端脚手架创建前端项目

### 盘古 前端 cli 工具

1. 安装

   ```sh
   npm install -g panku-cli
   ```

2. 命令介绍

   1. 查看可支持命令 `pk help`
   2. 查看版本  `pk -V`
   3. 创建项目 `pk init 项目名`

3. 创建项目介绍

   ![image-20230223115214205](https://cdn.jsdelivr.net/gh/gzh2157710760/img-lib/img/image-20230223115214205.png)

## 项目结构 

```bash
│  .editorconfig  编辑器配置文件
│  .env.development 开发环境配置
│  .env.production 线上环境配置
│  .eslintrc.cjs eslint配置
│  .gitignore  git忽略文件配置
│  .prettierrc.cjs prettierrc配置
│  index.html   系统模板页面
│  jsconfig.json  编辑器配置文件
│  package.json
│  README.md
├─config  vite 配置文件
│  ├─plugin  自定义vite插件目录
│  └─utils   vite 公众方法
├─public 静态资源
├─server   系统内置 node koa 服务
│  │  app.js  
│  ├─app  
│  ├─bin
│  │      www.js 
│  ├─config
│  ├─dbhelper
│  ├─middlewares
│  ├─routes
│  ├─static
│  └─utils
└─src  系统工作目录
    │  App.vue  系统入口
    │  main.js   系统入口
    ├─api   接口配置目录
    ├─assets  静态资源目录
    │  ├─images  图片
    │  └─style   css
    ├─components  公共组件
    ├─config  系统配置
    ├─constant   系统常数目录
    ├─hooks  系统公共hooks
    ├─layout  系统页面布局
    ├─mock  mock 数据接口 暂时不可用，如若需要可以 在node koa 中编写一个前端node接口
    ├─plugins  各个插件配置
    ├─router  路由配置
    ├─store  前端状态管理
    ├─utils 前端公共方法
    ├─validator 参数校验方法
    └─views  页面目录
```













```shell
# 查看当前分支下的所有 tag
git tag
# git 为项目打标签
git tag -a v0.0.1 -m "备注"
# 将本地名为 v3.0 的标签推送至远程仓库
git push origin v3.0
# 将本地所有标签一次性推送至远程仓库
git push origin --tags
# https://juejin.cn/post/7038929527417880606
```
