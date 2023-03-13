FROM nginx:latest
# 维护者信息
MAINTAINER aguzhh@163.com

# 将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下 vue-template 为项目名称
ADD vue-template /usr/share/nginx/html/vue-template/
ADD default.conf /etc/nginx/conf.d/default.conf
