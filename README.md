# mpa


## package.json 

### scripts
> 引用：https://www.jianshu.com/p/30b2b6bf367f

1. 生命周期：`scripts: pretest / test / posttest`
2. 串行执行：`scripts: npm run a && npm run b`，可使用 echo 1 测试
3. 并行执行：`scripts: npm run a  & npm run b`
4. 使用第三发包 [npm-run-all](https://www.npmjs.com/package/npm-run-all) 代替 && 或 & 执行串行或者并行任务
    ```sh
    # 安装依赖
    npm i -D npm-run-all
    # 并行 scripts:
    npm-run-all --parallel   a b
    # 串行 scripts:
    npm-run-all --sequential a b
    ```
5. 查看npm运行参数：`npm run env`
6. 输出npm运行参数：`scripts: echo $npm_package_name`
    ```sh
    # demo
    "testcycle": "echo testcycle",
    "pretestcycle": "echo pre testcycle",
    "posttestcycle": "echo post testcycle",
    "anther": "echo $npm_package_name",
    "do": "npm run anther && npm run pretestcycle",
    "doo": "npm-run-all --sequential anther pretestcycle"
    ```
7. 使用第三发包 [scripty](https://www.npmjs.com/package/scripty) 把package.json中scripts命令移动到scripts文件中
    ```sh
    chmod -R +x scripts
    ```



## todos
1. require to import & gulp
2. ？node-bash-title
3. 让项目跑起来
4. 整理webpack演进历程
5. create cli