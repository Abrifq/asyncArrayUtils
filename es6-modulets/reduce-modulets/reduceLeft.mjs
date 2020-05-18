import arrayConverter from "../arrayConverter.mjs";
/**
 * @async
 * @param {import("../types").ArrayLike} array
 * @param {import("../types").AsyncArrayReducerFunction} asyncFunction
 * @param {*} initialValue
 * @returns { Promise<*> }
 */
export default async function asyncReduce(array, asyncFunction, initialValue) {
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
}