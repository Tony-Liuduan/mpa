/**
 * @fileoverview webpack babel-load config
 * @author liuduan
 * @Date 2020-05-07 16:11:38
 * @LastEditTime 2020-05-25 22:59:27
 */
module.exports = {
    "presets": [
        [
            "@babel/preset-env",
        ],
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ],
}
