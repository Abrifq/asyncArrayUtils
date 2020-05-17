const arrayConverter = require("./arrayConverter");
/**
 * @param {Array} array
 * @param {import("./arrayConverter").AsyncArrayIteratorBooleanFunction} asyncFunction
 * @returns {Promise<boolean>}
 * @async
 */
exports = module.exports = async function asyncSome(array, asyncFunction) {
    array = arrayConverter(array);
    let doesSomeResolveToTrue = false;
    for (let i = 0; i < array.length; i++) {
        doesSomeResolveToTrue = !!(await asyncFunction(array[i], i, array));
        if (doesSomeResolveToTrue) {
            break;
        }
    }
    return doesSomeResolveToTrue;
};
