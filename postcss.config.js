/**
 * @fileoverview postcss config
 * @author liuduan
 * @Date 2020-05-25 21:28:17
 * @LastEditTime 2020-06-13 14:34:34
 */
/* eslint-disable quote-props */

module.exports = {
    // parser: 'sugarss',
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
            // 支持语法版本
            'stage': 0,
            // 嵌套
            'features': {
                'nesting-rules': true,
            },
        },
        // 'cssnano': {},
        'autoprefixer': { // TODO: 没用？？？
            // cascade: false,
            // flexbox: true,
        },
    },
};
