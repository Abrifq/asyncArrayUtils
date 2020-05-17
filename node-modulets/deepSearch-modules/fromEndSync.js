const arrayConverter = require("../arrayConverter");
/**
 * @param {Array} array
 * @param {import("../arrayConverter.js").ArrayIteratorBooleanFunction} syncFunction
 * @returns {number}
 */
exports.end.sync = function deepSearchFromEnd(array, syncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = array.length; i > 0; i--) {
        const result = syncFunction(array[i - 1], i - 1, array);
        if (result) { return i - 1; }
    }
    return defaultResult;
};