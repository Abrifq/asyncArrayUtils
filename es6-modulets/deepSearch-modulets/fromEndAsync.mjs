import arrayConverter from "../arrayConverter.mjs";
/**
 * @param {import("../types").ArrayLike} array
 * @param {import("../types").AsyncArrayIteratorBooleanFunction} asyncFunction
 * @returns {Promise<number>}
 * @async
 */
export default async function deepSearchFromEndAsync(array, asyncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = array.length; i > 0; i--) {
        const result = await asyncFunction(array[i - 1], i - 1, array);
        if (result) { return result; }
    }
    return defaultResult;
}