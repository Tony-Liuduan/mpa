#!/usr/bin/env bash 
# 输出项目api文档
rm -rf docs/jsdoc && jsdoc ./src/server/**/*.js -c jsdoc.cfg.json