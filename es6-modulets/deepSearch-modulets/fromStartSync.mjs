import arrayConverter from "../arrayConverter.mjs";
/**
 * @param {import("../types").ArrayLike} array
 * @param {import("../types").ArrayIteratorBooleanFunction} syncFunction
 * @returns {number}
 */
export default function deepSearch(array, syncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = 0; i < array.length; i++) {
        const result = syncFunction(array[i], i, array);
        if (result) {
            return result;
        }
    }
    return defaultResult;
}
