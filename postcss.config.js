/**
 * @fileoverview postcss config
 * @author liuduan
 * @Date 2020-05-25 21:28:17
 * @LastEditTime 2020-05-25 23:24:32
 */
/* eslint-disable quote-props */

module.exports = {
    parser: 'sugarss',
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        'cssnano': {},
        'autoprefixer': {},
    },
};
