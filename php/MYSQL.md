# mysql

基本环境：
brew install mysql
下载操作图形界面app-mysql workbench: https://dev.mysql.com/downloads/workbench/

账号=163邮箱
password=iso

## 登录mysql, 进入命令行操作
```sh
mysql -u root -p
# p:被设定为开机密码
```
```sql
-- 创建数据库 utf8
CREATE SCHEMA `db_test` DEFAULT CHARACTER SET utf8 ;
-- 注意必须有分号
show databases;
-- 修改默认数据库
use db_test;

-- 创建数据表
CREATE TABLE `db_test`.`t_student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `birthdate` DATE NOT NULL,
  `gender` CHAR(1) NOT NULL COMMENT '男性：M\n女性：F',
  `class_id` INT NOT NULL,
  PRIMARY KEY (`id`));
show tables;

-- 查询数量
SELECT count(*) FROM db_test.t_student WHERE gender='F';

-- 查询min
SELECT min(birthdate) FROM db_test.t_student;

-- 查询max
SELECT max(birthdate) FROM db_test.t_student;

-- 查询max && 所在行数据
SELECT * FROM db_test.t_student WHERE birthdate=(SELECT max(birthdate) FROM db_test.t_student);
quit;

-- 当前时间 'YYYY-MM-DD hh:mm:ss'
SELECT now();

-- 随机数
SELECT rand() * 100;

-- 拼接字符串
SELECT concat(id, ' ',name) FROM t_student ;

-- 条件查询1
SELECT * FROM t_student WHERE birthdate >= '1990-01-01' AND birthdate <= '1991-12-31';

-- 条件查询2
SELECT * FROM t_student WHERE birthdate BETWEEN '1990-01-01' AND '1991-12-31';

-- like 模糊查询：字段name值是以t开头的行，%是通配符
SELECT * FROM t_student WHERE name LIKE 't%';

-- like 模糊查询：字段name值是带n的行，%是通配符
SELECT * FROM t_student WHERE name LIKE '%n%';

-- like 模糊查询：字段name值是以n结尾的行，%是通配符
SELECT * FROM t_student WHERE name LIKE '%n';
-- ps: 当查询内容很多时候，不要用like会降低数据库性能

-- 正序排序，数字小的在前， ASC可以被省略掉
SELECT * FROM t_student ORDER BY birthdate ASC;

-- 逆序排序，数字大的在前
SELECT * FROM t_student ORDER BY birthdate DESC;

-- 关联表查询
SELECT * FROM t_student, t_class WHERE t_student.class_id=t_class.class_id;

-- 关联表查询 && 筛选需要的字段，一下全要字段，会消耗计算机性能
SELECT 
t_student.id, t_student.name, t_class.class_name
FROM t_student, t_class WHERE t_student.class_id=t_class.class_id;


-- 关联表查询 && 筛选字段，by 左连接
SELECT 
t_student.id, t_student.name, t_class.class_name
FROM t_student LEFT JOIN t_class 
ON t_student.class_id=t_class.class_id;
```


##  管理mysql

```sh
mysql.server start
mysql.server status
mysql.server stop
```

## mysql workbanch

1. 创建数据库schema
    - schema
    - utf8 defautl
2. 创建数据表table
    - PK 主键
    - NN 非空
    - AI 自动增长
    