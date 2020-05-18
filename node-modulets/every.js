const arrayConverter = require("./arrayConverter");
/**
 * @param {import("./types").ArrayLike} array
 * @param {import("./types").AsyncArrayIteratorBooleanFunction} asyncFunction
 * @returns {Promise<boolean>}
 * @async
 */
module.exports = exports = async function asyncEvery(array, asyncFunction) {
    array = arrayConverter(array);
    let didAnyFail = false;
    for (let i = 0; i < array.length; i++) {
        didAnyFail = !(await asyncFunction(array[i], i, array));
        if (didAnyFail) {
            break;
        }
    }
    return !didAnyFail;
};