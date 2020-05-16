# learn-php

## yii
https://www.yiiframework.com/doc/guide/2.0/zh-cn/start-workflow

```sh
cd basic
php yii serve --port=8888
```

## 安装 composer
https://pkg.phpcomposer.com/

```sh
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
```

上述 3 条命令的作用依次是：
下载安装脚本 － composer-setup.php － 到当前目录。
执行安装过程。
删除安装脚本。


## MVC

* controller
* modal
* view


user -> controller(action) -> modal -> view -> user


### 缓存

* 只用来读的
* redis memcache


### sql类型

* 字符串
    - 定长字符串 char(长度)，占数据库字节数是固定长度的，即便字段报错长度少于指定长度，内存中也保存指定长度字节
    - 变长字符串 varchar(长度上线值)
* 数字类型
    - 整数 int 32位 4字节
    - 单精度浮点数 float 48位 6字节
    - 双精度浮点数 double 64位 8字节