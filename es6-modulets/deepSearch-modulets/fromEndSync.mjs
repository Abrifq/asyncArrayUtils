import arrayConverter from "../arrayConverter.mjs";
/**
 * @param {import("../types").ArrayLike} array
 * @param {import("../types").ArrayIteratorBooleanFunction} syncFunction
 * @returns {number}
 */
export default function deepSearchFromEnd(array, syncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = array.length; i > 0; i--) {
        const result = syncFunction(array[i - 1], i - 1, array);
        if (result) { return result; }
    }
    return defaultResult;
}