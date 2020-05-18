import arrayConverter from "./arrayConverter.mjs";

/**
 * @param {import("./types").ArrayLike} array 
 * @param {import("./types").AsyncArrayIteratorFunction} asyncFunction 
 * @generator
 * @returns {{next:GeneratorIterator, return:GeneratorIterator, throw:GeneratorIterator }}
 */
export default function* asyncIteratedMap(array, asyncFunction) {
    array = arrayConverter(array); //Overwrite old reference, for GC.
    for (let index = 0; index < array.length; index++) {
        yield asyncFunction(array[index], index, array);
    }
}
//Some type declarations just in case something goes wrong
/**@typedef GeneratorResult
 * @prop {* | undefined} value
 * @prop {boolean} done
 */

/**@callback GeneratorIterator
 * @param {*=} nextYieldParameter
 * @returns {GeneratorResult}
 * @throws {Error | Promise<undefined,Error>} - Can throw any error from generator.throw() or the sub-function asyncFunction.
 */