/**
 * @returns {Array}
 * @param {import("./types").ArrayLike} arrayLike 
 */
export default arrayLike => {
    const convertAllowedTypes = [Array,Set, Object.getPrototypeOf(Uint8Array)];
    if (convertAllowedTypes.some(type => arrayLike instanceof type)) {
        return [...arrayLike];
    }
    throw "Incompatible type.";
};
