## 介绍
react+django框架，部署到了云服务器,通过网站访问，方便调用。目前支持aiproxy和openai的api接口,界面如下：

## 部署
```
# install docker
sudo apt-get update
sudo apt install docker.io
# check if installed
sudo docker --version

# install docker-compose 
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
# check if installed
sudo docker-compose version

git clone https://github.com/<your account or organization>/<repo>.git
cd <repo>
sudo docker-compose -f docker-compose-pro.yml up --build
```