/**
 * @returns {Array}
 * @param {Set|TypedArray|Array} arrayLike 
 */
const arrayConverter = arrayLike => {
    const convertAllowedTypes = [Set, Object.getPrototypeOf(Uint8Array)];
    if (convertAllowedTypes.some(type => arrayLike instanceof type)) {
        return [...arrayLike];
    }
    return arrayLike;
};
/**
 * 
 * @param {Array} array 
 * @param {} asyncFunction 
 */
export const some = async function asyncSome(array, asyncFunction) {
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
export const mapConstructor = function asyncArrayMapConstructor(array) {
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
export const reduceRight = async function asyncReduceRight(array, asyncFunction, initialValue) {
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
export const reduce = async function asyncReduce(array, asyncFunction, initialValue) {
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
export const forEach = async function asyncForEach(array, asyncFunction) {
    const copiedArray = [...arrayConverter(array)];
    let promiseChain = Promise.resolve();
    for (let i = 0; i < copiedArray.length; i++) {
        await promiseChain; //added await here instead of end of the loop to prevent side-effects. May increase time spent on chain.
        const currentPromise = asyncFunction(copiedArray[i], i, copiedArray);
        promiseChain = promiseChain.then(currentPromise);
    }
    return;
};
export const every = async function asyncEvery(array, asyncFunction) {
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

export const extendedIndexOf_sync = function deepSearch(array, syncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = 0; i < array.length; i++) {
        const result = syncFunction(array[i], i, array);
        if (result) {
            return result;
        }
    }
    return defaultResult;
};
export const extendedIndexOf = async function deepSearchAsync(array, asyncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = 0; i < array.length; i++) {
        const result = await asyncFunction(array[i], i, array);
        if (result) { return result; }
    }
    return defaultResult;
};
export const extendedLastIndexOf = async function deepSearchFromEndAsync(array, asyncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = array.length; i > 0; i--) {
        const result = await asyncFunction(array[i - 1], i - 1, array);
        if (result) { return result; }
    }
    return defaultResult;
};
export const extendedLastIndexOf_sync = function deepSearchFromEnd(array, syncFunction) {
    array = arrayConverter(array);
    const defaultResult = -1;
    for (let i = array.length; i > 0; i--) {
        const result = syncFunction(array[i - 1], i - 1, array);
        if (result) { return result; }
    }
    return defaultResult;
};
export const filter = async function filterAsync(array, asyncBooleanFunction) {
    array = arrayConverter(array);
    const filteredArray = [];
    for (let i = 0; i < array.length; i++) {
        if (await asyncBooleanFunction(array[i], i, array)) {
            filteredArray.push(array[i]);
        }
    }
    return filteredArray;
};