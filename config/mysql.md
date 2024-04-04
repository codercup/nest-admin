# MySQL 相关命令

## docker 运行 mysql

```sh
docker run -itd --name nest10-starter-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

## 进入 mysql 命令

格式 `mysql -u用户名 -p密码 (-h主机名 -P端口号)`

```sh
mysql -uroot -p123456
```

## 创建数据库

默认是没有 `nest10_starer` 这个数据库的，需要创建；

```sh
# 显示数据库列表
show databases;
# 创建数据库；
create database nest10_starer;
```

注意数据库名不允许 `中划线` ，要用 `下划线` 。
