const arrayConverter = require("../arrayConverter");
/**
 * @param {import("../types").ArrayLike} array
 * @param {import("../types").ArrayIteratorBooleanFunction} syncFunction
 * @returns {number}
 */
module.exports = exports = function deepSearch(array, syncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = 0; i < array.length; i++) {
        const result = syncFunction(array[i], i, array);
        if (result) {
            return i;
        }
    }
    return defaultResult;
};
