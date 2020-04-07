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
 * @async
 * @param {*} item - The item of the iterated array.
 * @param {number} index - The index of the item in the iterated array.
 * @param {Array<*>} array - The iterated array.
 * @returns {Promise<boolean>}
 */
/**
 * @callback AsyncArrayIteratorVoidFunction 
 * @param {*} item - The item of the iterated array.
 * @param {number} index - The index of the item in the iterated array.
 * @param {Array<*>} array - The iterated array.
 * @async
 * @returns {Promise<void>}
 */
/**
 * @callback AsyncArrayReducerFunction
 * @param {*} initialValue - The result of the previous iteration.
 * @param {*} currentItem - The next item from the array being reduced.
 * @returns {Promise<*>} - Will be awaited and used in next iteration.
 */
/**@const */
const asyncArrayUtils = {};
{
    /**
     * @returns { Array }
     * @param { Set | Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray } arrayLike 
     */
    const arrayConverter = arrayLike => {
        const convertAllowedTypes = [Set, Object.getPrototypeOf(Uint8Array)];
        if (convertAllowedTypes.some(type => arrayLike instanceof type)) {
            return [...arrayLike];
        }
        return arrayLike;
    };
    /**
     * @async
     * @returns {Promise<boolean>}
     * @param {Array} array 
     * @param {AsyncArrayIteratorBooleanFunction} asyncFunction 
     */
    asyncArrayUtils.some = async function asyncSome(array, asyncFunction) {
        array = arrayConverter(array);
        let doesSomeResolveToTrue = false;
        for (let i = 0; i < array.length; i++) {
            doesSomeResolveToTrue = !!(await asyncFunction(array[i], i, array));
            if (doesSomeResolveToTrue) {
                break;
            }
        }
        return doesSomeResolveToTrue;
    };
    /**
     * @deprecated - And will be refactored in a near time for better syntax
     * @desc - This one has a different approach to mapping. Please see the example
     * @param {Array} array
     * @returns {{
     array:Array,
     map(asyncFunction:AsyncArrayIteratorFunction)=>Promise<Array>
     }}
     *@example `mapConstructor([1,2,3]).map(getSquareAsync).then(mapObj=>mapObj.array).then(console.log) //Expected async output: [1,4,9]`
     */
    asyncArrayUtils.mapConstructor = function asyncArrayMapConstructor(array) {
        const self = {
            array: [...arrayConverter(array)],
            map: async function (asyncFunction) {
                for (let i = 0; i < this.array.length; i++) {
                    this.array[i] = await asyncFunction(this.array[i], i, this.array);
                }
                return self;
            }
        };
        return self;
    };
    /**
     * @async
     * @param {Array} array
     * @param {AsyncArrayReducerFunction} asyncFunction
     * @param {*} initialValue
     * @returns { Promise<*> }
     */
    asyncArrayUtils.reduceRight = async function asyncReduceRight(array, asyncFunction, initialValue) {
        array = arrayConverter(array);
        let i = array.length - 1;
        if (typeof initialValue === "undefined") {
            initialValue = array[i];
            i--;
        }
        for (; i !== -1; i--) {
            initialValue = await asyncFunction(initialValue, array[i], i, array);
        }
    };
    /**
     * @async
     * @param {Array} array
     * @param {AsyncArrayReducerFunction} asyncFunction
     * @param {*} initialValue
     * @returns { Promise<*> }
     */
    asyncArrayUtils.reduce = async function asyncReduce(array, asyncFunction, initialValue) {
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
    };
    /**
     * @param {Array} array
     * @param {AsyncArrayIteratorVoidFunction} asyncFunction
     * @returns {Promise<void>}
     * @async
     */
    asyncArrayUtils.forEach = async function asyncForEach(array, asyncFunction) {
        const copiedArray = [...arrayConverter(array)];
        let promiseChain = Promise.resolve();
        for (let i = 0; i < copiedArray.length; i++) {
            await promiseChain; //added await here instead of end of the loop to prevent side-effects. May increase time spent on chain.
            const currentPromise = asyncFunction(copiedArray[i], i, copiedArray);
            promiseChain = promiseChain.then(currentPromise);
        }
        return;
    };
    /**
     * @param {Array} array
     * @param {AsyncArrayIteratorBooleanFunction} asyncFunction
     * @returns {Promise<boolean>}
     * @async
     */
    asyncArrayUtils.every = async function asyncEvery(array, asyncFunction) {
        array = arrayConverter(array);
        let didAnyFail = false;
        for (let i = 0; i < array.length; i++) {
            didAnyFail = !(await asyncFunction(array[i], i, array));
            if (didAnyFail) {
                break;
            }
        }
        return !didAnyFail;
    };
    /**
     * @param {Array} array
     * @param {ArrayIteratorBooleanFunction} syncFunction
     * @returns {number}
     */
    asyncArrayUtils.extendedIndexOf_sync = function deepSearch(array, syncFunction) {
        array = arrayConverter(array);
        const defaultResult = -1;
        for (let i = 0; i < array.length; i++) {
            const result = syncFunction(array[i], i, array);
            if (result) {
                return i;
            }
        }
        return defaultResult;
    };
    /**
     * @param {Array} array
     * @param {AsyncArrayIteratorBooleanFunction} asyncFunction
     * @returns {Promise<number>}
     * @async
     */
    asyncArrayUtils.extendedIndexOf = async function deepSearchAsync(array, asyncFunction) {
        array = arrayConverter(array);
        const defaultResult = -1;
        for (let i = 0; i < array.length; i++) {
            const result = await asyncFunction(array[i], i, array);
            if (result) { return i; }
        }
        return defaultResult;
    };
    /**
     * @param {Array} array
     * @param {AsyncArrayIteratorBooleanFunction} asyncFunction
     * @returns {Promise<number>}
     * @async
     */
    asyncArrayUtils.extendedLastIndexOf = async function deepSearchFromEndAsync(array, asyncFunction) {
        array = arrayConverter(array);
        const defaultResult = -1;
        for (let i = array.length; i > 0; i--) {
            const result = await asyncFunction(array[i - 1], i - 1, array);
            if (result) { return i - 1; }
        }
        return defaultResult;
    };
    /**
     * @param {Array} array
     * @param {ArrayIteratorBooleanFunction} syncFunction
     * @returns {number}
     */
    asyncArrayUtils.extendedLastIndexOf_sync = function deepSearchFromEnd(array, syncFunction) {
        array = arrayConverter(array);
        const defaultResult = -1;
        for (let i = array.length; i > 0; i--) {
            const result = syncFunction(array[i - 1], i - 1, array);
            if (result) { return i - 1; }
        }
        return defaultResult;
    };
    /**
     * @param {Array} array
     * @returns {Promise<Array>}
     * @param {AsyncArrayIteratorBooleanFunction} asyncBooleanFunction
     * @async
     */
    asyncArrayUtils.filter = async function filterAsync(array, asyncBooleanFunction) {
        array = arrayConverter(array);
        const filteredArray = [];
        for (let i = 0; i < array.length; i++) {
            if (await asyncBooleanFunction(array[i], i, array)) {
                filteredArray.push(array[i]);
            }
        }
        return filteredArray;
    };
}
Object.freeze(asyncArrayUtils);