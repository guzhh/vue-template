# 前端脚手架文档

> 当前项目基于 vue3,vite4,naiveui 等技术，以及集成公司内部全套机构、科室、角色、权限控制等的全套后台解决方案

## 如何以前端脚手架创建前端项目

### 盘古 前端 cli 工具

1. 安装

   ```sh
   npm install -g panku-cli
   ```

2. 命令介绍

   1. 查看可支持命令 `pk help`
   2. 查看版本 `pk -V`
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

## 公共组件

### 富文本编辑器

> 此富文本编辑器是基于 [wangEditor](https://www.wangeditor.com/) 封装的公共业务组件，组件封装了图片上传等功能，使用极其简单

#### 使用示例

```vue
<template>
	<page-content>
		<n-card size="small" title="富文本编辑器">
			<template #header-extra>
				<n-button size="small" type="primary" @click="viewTheContent">查看内容</n-button>
			</template>
			<wang-editor v-model:value="htmlVal" :height="height - 120" />
		</n-card>
	</page-content>
</template>

<script setup>
import { useWindowSize } from "@/hooks/useWindowSize";

const { height } = useWindowSize();
const htmlVal = ref("<p></p>");

const viewTheContent = () => {
	console.log(htmlVal.value);
};
</script>

<style scoped></style>
```

### option-badge 徽标

> 此组件主要是为了展示一个字段只有特定的几个值，每个值用不同的颜色进行标识
> ![image-20230309160642772](http://qiniu.guzhh.xyz/image-20230309160642772.png)

#### 使用事例

```vue
<template>
	<option-badge :options="options" :val="1" />
</template>

<script setup>
const options = ref([
	{ label: "未删除", value: 0, type: "success" },
	{ label: "已删除", value: 1, type: "error" }
]);
</script>
```

### 字典单选、多选、回显公共组件

#### 单选 `dict-select`

```vue
<!-- dict-code 父级字典编码-->
<!--value 为字典编码字符串-->
<dict-select dict-code="RULE_FIELD" v-model:value="data.dictValue" />
```

#### 多选 `dict-multi`

```vue
<!-- dict-code 父级字典编码-->
<!--value 为一个以英文逗号分隔的字典编码字符串-->
<dict-multi dict-code="RULE_FIELD" v-model:value="data.dictMulti" />
```

#### 字典回显 `dict-show`

```vue
<!--dict-code 单个字典编码或者 多个以逗号分隔的字典编码字符串-->
<dict-show :dict-code="data.dictMulti" />
```

## 项目部署

> 一般我们的前端项目都使用 nginx 进行部署，部署时需要配置对 html 文件、JSON 文件不进行缓存

```chef
location /pankuoa/ {
    root html;
    index index.html index.htm;
    try_files $uri $uri/ /pankuoa/index.html last;
    if ($request_filename ~* .*\.(?:htm|html|json)$)
    {
      add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";  # 对html文件、JSON文件设置永远不缓存
    }
}
```

## 一些 git 命令

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

> stash 相关操作 https://juejin.cn/post/7033688858134839309
