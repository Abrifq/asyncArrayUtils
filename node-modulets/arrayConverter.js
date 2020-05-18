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
