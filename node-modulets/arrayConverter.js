/**
 * @returns { Array }
 * @param { Set | Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray } arrayLike 
 */
exports = module.exports = arrayLike => {
    const convertAllowedTypes = [Set, Object.getPrototypeOf(Uint8Array)];
    if (convertAllowedTypes.some(type => arrayLike instanceof type)) {
        return [...arrayLike];
    }
    return arrayLike;
};
//Exporting common callback types.
/**
 * @callback AsyncArrayIteratorFunction
 * @param {*} item - The item of the iterated array.
 * @param {number} index - The index of the item in the iterated array.
 * @param {Array<*>} array - The iterated array.
 * @returns {Promise<*>}
 * @async
 *
 */
/**
 * @callback ArrayIteratorBooleanFunction
 * @param {*} item - The item of the iterated array.
 * @param {number} index - The index of the item in the iterated array.
 * @param {Array<*>} array - The iterated array.
 * @returns {boolean}
 */

/**
 * @callback AsyncArrayIteratorBooleanFunction
 * @param {*} item - The item of the iterated array.
 * @param {number} index - The index of the item in the iterated array.
 * @param {Array<*>} array - The iterated array.
 * @returns {Promise<boolean>}
 * @async
 */
/**
 * @callback AsyncArrayIteratorVoidFunction
 * @param {*} item - The item of the iterated array.
 * @param {number} index - The index of the item in the iterated array.
 * @param {Array<*>} array - The iterated array.
 * @returns {Promise<void>}
 * @async
 */
/**
 * @callback AsyncArrayReducerFunction
 * @param {*} initialValue - The result of the previous iteration.
 * @param {*} currentItem - The next item from the array being reduced.
 * @returns {Promise<*>} - Will be awaited and used in next iteration.
 * @async
 */
