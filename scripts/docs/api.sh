#!/usr/bin/env bash 
# 输出项目api文档
rm -rf docs/jsdoc && jsdoc ./**/*.js -c jsdoc.cfg.json