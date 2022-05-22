-d 是在后台运行，如果不指明-d，container 运行完命令后会立即退出。比如你想起一个 server，没有-d 的话，server 启动后，就退出了。（我的理解），有错误，比如 jenkins 的运行不需要-d

有-d 的话，会有个守护态在后台运行。

## 问题

1. 两个-p 是什么鬼

```
docker run -p 8080:8080 -p 50000:50000 jenkins

```

-p 可以多次使用

2. docker exec -i -t 等于 docker exec -it 吗 ? 答：是
3. docker node 这个 image 应该自带了 linux 的运行环境吧，答：是的吧。很多镜像都会基于 debian 或者 alpine

## 常用命令

1. docker pull 从 Docker Hub 仓库拉取镜像

   举例： `docker pull ubuntu:12.04`

2. docker images 列出本地镜像

3. docker commit 修改镜像。更加通用的是利用 Dockerfile。

4. docker push ：上传镜像

   举例：`docker push ouruser/sinatra`

5. docker save: 导出镜像到本地文件

6. docker load: 导入文件到本地镜像库

7. docker rmi：移除镜像(注意 `docker rm` 命令是移除容器)。

8. docker run：运行容器

   如：docker run ubuntu:14.04 /bin/echo 'Hello world'

   下面的命令则启动一个 bash 终端，允许用户进行交互。

   ```
   docker run -t -i ubuntu:14.04 /bin/bash
   ```

   其中，`-t` 选项让 Docker 分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上， `-i` 则让容器的标准输入保持打开。

   在交互模式下，用户可以通过所创建的终端来输入命令。

   更多的时候，需要让 Docker 容器在后台以守护态（Daemonized）形式运行。此时，可以通过添加 `-d` 参数来实现。

   例如下面的命令会在后台运行容器。

   ```
   docker run -d ubuntu:14.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"
   ```

9. docker start: 启动已终止容器，`docker restart` 命令会将一个运行态的容器终止，然后再重新启动它。

10. docker ps： 查看容器列表，只显示当前运行的容器。终止状态的容器可以用 `docker ps -a` 命令看到

11. docker logs: 查看容器的输出信息。比如： docker logs insane_babbage

12. 可以使用 `docker stop` 来终止一个运行中的容器。

13. docker attach：在使用 `-d` 参数时，容器启动后会进入后台。 某些时候需要进入容器进行操作，有很多种方法，包括使用`docker attach` 命令或 `nsenter` 工具等。

    ```cmd
    $ sudo docker run -idt ubuntu
    243c32535da7d142fb0e6df616a3c3ada0b8ab417937c853a9e1c251f499f550
    $ sudo docker ps
    CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
    243c32535da7        ubuntu:latest       "/bin/bash"         18 seconds ago      Up 17 seconds                           nostalgic_hypatia
    $sudo docker attach nostalgic_hypatia
    root@243c32535da7:/#
    ```

14. docker rm: 删除一个处于终止状态的容器

---

```cmd
PS C:\docker-test> docker run -it -v C:\docker-test:/app ubuntu /bin/bash
root@a4f495a4267c:/# ls
bin   dev          etc   lib    lib64   media  opt   root  sbin  sys  usr
boot  app  home  lib32  libx32  mnt    proc  run   srv   tmp  var
root@a4f495a4267c:/# cd app/
root@a4f495a4267c:/app# ls
a.js  b.txt
```

---

## https://www.jianshu.com/p/a97d2efb23c5

## ports 和 expose 的区别

不管是否指定主机端口，使用 ports 都会将端口暴露给主机和其他容器。和 ports 的区别是，expose 不会将端口暴露给主机，只暴露给容器。

## windows 安装 gitlab-runner 命令（实现 docker in docker)

docker run -d --name gitlab-runner --restart always -v //var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker:/usr/bin/docker gitlab/gitlab-runner:latest
