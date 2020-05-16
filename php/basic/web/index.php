<?php

/**
 * Web 应用的入口脚本必须放在终端用户能够访问的目录下， 通常命名为 index.php
 * 
 * 
 */


// comment out the following two lines when deployed to production
// 将 YII_ENV_DEV 设为 true
// 鉴于这行代码的定义，应用处于开发模式下，按照config的配置会打开 Gii 模块
defined('YII_DEBUG') or define('YII_DEBUG', true);
/* 
上面代码等同于：
if (!defined('YII_DEBUG')) {
    define('YII_DEBUG', true);
} 
*/
defined('YII_ENV') or define('YII_ENV', 'dev');


// 注册 Composer 自动加载器
require __DIR__ . '/../vendor/autoload.php';
// 包含 Yii 类文件
require __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';
// 加载应用配置
$config = require __DIR__ . '/../config/web.php';
// 创建、配置、运行一个应用。实例化应用主体、配置应用主体
(new yii\web\Application($config))->run();
