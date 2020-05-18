import arrayConverter from "./arrayConverter.mjs";
/**
 * @param {Array} array
 * @param {import("./types").AsyncArrayIteratorBooleanFunction} asyncFunction
 * @returns {Promise<boolean>}
 * @async
 */
export default async function asyncSome(array, asyncFunction) {
    array = arrayConverter(array);
    let doesSomeResolveToTrue = false;
    for (let i = 0; i < array.length; i++) {
        doesSomeResolveToTrue = !!(await asyncFunction(array[i], i, array));
        if (doesSomeResolveToTrue) {
            break;
        }
    }
    return doesSomeResolveToTrue;
}
