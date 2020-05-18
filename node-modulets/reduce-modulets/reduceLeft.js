const arrayConverter = require("../arrayConverter");
/**
 * @async
 * @param {Array} array
 * @param {import("../types").AsyncArrayReducerFunction} asyncFunction
 * @param {*} initialValue
 * @returns { Promise<*> }
 */
module.exports = exports = async function asyncReduce(array, asyncFunction, initialValue) {
    array = arrayConverter(array);
    let i = 0;
    if (typeof initialValue === "undefined") {
        initialValue = array[i];
        i++;
    }
    for (; i < array.length; i++) {
        initialValue = await asyncFunction(initialValue, array[i], i, array);
    }
    return initialValue;
};