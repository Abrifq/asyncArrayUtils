const arrayConverter = require("./arrayConverter");
/**
 * @param {Array} array
 * @returns {Promise<Array>}
 * @param {import("./arrayConverter").AsyncArrayIteratorBooleanFunction} asyncBooleanFunction
 * @async
 */
module.exports = exports = async function filterAsync(array, asyncBooleanFunction) {
    array = arrayConverter(array);
    const filteredArray = [];
    for (let i = 0; i < array.length; i++) {
        if (await asyncBooleanFunction(array[i], i, array)) {
            filteredArray.push(array[i]);
        }
    }
    return filteredArray;
};