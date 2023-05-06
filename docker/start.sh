cd /home/app/vue-template
echo "---------------------- docker-compose stop --------------------"
docker-compose -f docker-compose.yml down # 停止运行的容器，并且会删除已停止的容器以及已创建的所有网络
echo "---------------------- docker-compose build ----------------------"
docker-compose -f docker-compose.yml build
echo "---------------------- docker-compose up ----------------------"
docker-compose -f docker-compose.yml up -d
