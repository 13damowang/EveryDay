/**
 * 
 * @param {object} obj 
 * @param {string} key 
 * @param {*} value 
 * @param {Boolean} enumerable
 */
export const def = function (obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    //根据外部参数决定对象的一些配置
    value,  //属性的值
    enumerable, //是否可以被枚举出来
    writable: true, //是否可以被修改
    configurable: true  //是否可以被删除
  })
}