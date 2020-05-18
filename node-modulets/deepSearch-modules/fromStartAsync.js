const arrayConverter = require("../arrayConverter");
/**
 * @param {Array} array
 * @param {import("../types").AsyncArrayIteratorBooleanFunction} asyncFunction
 * @returns {Promise<number>}
 * @async
 */
module.exports = exports = async function deepSearchAsync(array, asyncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = 0; i < array.length; i++) {
        const result = await asyncFunction(array[i], i, array);
        if (result) { return i; }
    }
    return defaultResult;
};