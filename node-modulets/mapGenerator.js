const arrayConverter = require("./arrayConverter");

/**
 * 
 * @param {*} array 
 * @param {*} asyncFunction 
 * @generator
 * @returns {{next:GeneratorIterator, return:GeneratorIterator, throw:GeneratorIterator }}
 */
module.exports = exports = function* asyncIteratedMap(array, asyncFunction) {
    const copiedArray = arrayConverter(array);
    for (let index = 0; index < copiedArray.length; index++) {
        yield asyncFunction(copiedArray[index], index, copiedArray);
    }
};

/**@typedef GeneratorResult
 * @prop {* | undefined} value
 * @prop {boolean} done
 */

/**@callback GeneratorIterator
 * @param {*=} nextYieldParameter
 * @returns {GeneratorResult}
 * @throws {Error | Promise<undefined,Error>} - Can throw any error from generator.throw() or the sub-function asyncFunction.
 */