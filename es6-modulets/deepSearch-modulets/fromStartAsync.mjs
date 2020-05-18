import arrayConverter from "../arrayConverter.mjs";
/**
 * @param {import("../types").ArrayLike} array
 * @param {import("../types").AsyncArrayIteratorBooleanFunction} asyncFunction
 * @returns {Promise<number>}
 * @async
 */
export default async function deepSearchAsync(array, asyncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = 0; i < array.length; i++) {
        const result = await asyncFunction(array[i], i, array);
        if (result) { return result; }
    }
    return defaultResult;
}