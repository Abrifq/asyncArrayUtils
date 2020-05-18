/**
 * @returns { Array }
 * @param {import("./types").ArrayLike} arrayLike 
 * @throws {string} Throws an error if the given parameter is not arrayLike.
 */
exports = module.exports = arrayLike => {
    const convertAllowedTypes = [Array, Set, Object.getPrototypeOf(Uint8Array)];
    if (convertAllowedTypes.some(type => arrayLike instanceof type)) {
        return [...arrayLike];
    }
    throw "Incompatible type.";
};
