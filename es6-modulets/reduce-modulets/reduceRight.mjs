import arrayConverter from "../arrayConverter.mjs";
/**
 * @async
 * @param {import("../types").ArrayLike} array
 * @param {import("../types").AsyncArrayReducerFunction} asyncFunction
 * @param {*} initialValue
 * @returns { Promise<*> }
 */
export default async function asyncReduceRight(array, asyncFunction, initialValue) {
    array = arrayConverter(array);
    let i = array.length - 1;
    if (typeof initialValue === "undefined") {
        initialValue = array[i];
        i--;
    }
    for (; i !== -1; i--) {
        initialValue = await asyncFunction(initialValue, array[i], i, array);
    }
}