import arrayConverter from "./arrayConverter.mjs";
/**
 * @param {import("./types").ArrayLike} array
 * @param {import("./types").AsyncArrayIteratorBooleanFunction} asyncFunction
 * @returns {Promise<boolean>}
 * @async
 */
export default async function asyncEvery(array, asyncFunction) {
    array = arrayConverter(array);
    let didAnyFail = false;
    for (let i = 0; i < array.length; i++) {
        didAnyFail = !(await asyncFunction(array[i], i, array));
        if (didAnyFail) {
            break;
        }
    }
    return !didAnyFail;
}