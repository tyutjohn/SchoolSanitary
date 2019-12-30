/*
 * @Author: johnwang
 * @since: 2019-11-01 22:11:22
 * @lastTime: 2019-11-01 22:14:42
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const isEmpty = value => {
    return (value == undefined || 
           value === null || 
           (typeof value === 'object' && Object.keys(value).length === 0) || 
           (typeof value === 'string' && value.trim().length === 0)
    );
};

module.exports=isEmpty;