const arrayConverter = require("../arrayConverter");
/**
 * @param {Array} array
 * @param {import("../types").AsyncArrayIteratorBooleanFunction} asyncFunction
 * @returns {Promise<number>}
 * @async
 */
module.exports = exports = async function deepSearchFromEndAsync(array, asyncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = array.length; i > 0; i--) {
        const result = await asyncFunction(array[i - 1], i - 1, array);
        if (result) { return i - 1; }
    }
    return defaultResult;
};