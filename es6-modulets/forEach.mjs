import arrayConverter from "./arrayConverter.mjs";
/**
 * @param {import("./types").ArrayLike} array
 * @param {import("./types").AsyncArrayIteratorVoidFunction} asyncFunction
 * @returns {Promise<void>}
 * @async
 */
export default async function asyncForEach(array, asyncFunction) {
    array = arrayConverter(array); //Overwrite old reference, for GC.
    let promiseChain = Promise.resolve();
    for (let i = 0; i < array.length; i++) {
        await promiseChain; //added await here instead of end of the loop to prevent side-effects. May increase time spent on chain.
        const currentPromise = asyncFunction(array[i], i, array);
        promiseChain = promiseChain.then(currentPromise);
    }
    return;
}