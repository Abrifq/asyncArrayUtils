const arrayConverter = require("./arrayConverter");
/**
 * @param {Array} array
 * @param {import("./types").AsyncArrayIteratorVoidFunction} asyncFunction
 * @returns {Promise<void>}
 * @async
 */
module.exports = exports = async function asyncForEach(array, asyncFunction) {
    const copiedArray = [...arrayConverter(array)];
    let promiseChain = Promise.resolve();
    for (let i = 0; i < copiedArray.length; i++) {
        await promiseChain; //added await here instead of end of the loop to prevent side-effects. May increase time spent on chain.
        const currentPromise = asyncFunction(copiedArray[i], i, copiedArray);
        promiseChain = promiseChain.then(currentPromise);
    }
    return;
};