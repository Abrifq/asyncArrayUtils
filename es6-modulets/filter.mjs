import arrayConverter from "./arrayConverter.mjs";
/**
 * @param {import("./types").ArrayLike} array
 * @returns {Promise<Array>}
 * @param {import("./types").AsyncArrayIteratorBooleanFunction} asyncBooleanFunction
 * @async
 */
export default async function filterAsync(array, asyncBooleanFunction) {
    array = arrayConverter(array);
    const filteredArray = [];
    for (let i = 0; i < array.length; i++) {
        if (await asyncBooleanFunction(array[i], i, array)) {
            filteredArray.push(array[i]);
        }
    }
    return filteredArray;
}