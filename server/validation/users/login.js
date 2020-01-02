/*
 * @Author: johnwang
 * @since: 2019-11-01 22:06:27
 * @lastTime: 2019-11-01 22:38:19
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    //验证是否是字符串
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = '邮箱不合法';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = '邮箱不能为空';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "密码不能为空"
    }

    if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = '密码的长度不能小于6位且不能超过30位';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}