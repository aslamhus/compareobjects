
/**
 * Deep Compare objects for equality
 * @param {object} a
 * @param {object} b
 * @returns {array} - returns array of unequal values.
 * Objects are equal if the returned array's length is 0
 */
export const compareObjects = (a, b) => {
  if (a === b) return [];
  // check a, b are not null
  if (a == null || (a == undefined) & b) return [[null, b]];
  if (b == null || (b == undefined) & a) return [[a, null]];
  // check a, b have equal number of keys
  let aKeys = Object.keys(a).length;
  let bKeys = Object.keys(b).length;
  if (aKeys != bKeys) return [a, b];
  if (aKeys == 0 && bKeys == 0) return [];
  // compare each key and value
  return Object.keys(a).reduce((acc, key) => {
    // check both objects have the same key
    const keyFound = Object.keys(b).find((bkey) => key == bkey);
    if (keyFound) {
      // 1) is the key's value an object?
      const isObject = typeof a[key] == 'object' && a[key] != null;
      if (isObject) {
        const deepCompare = compareObjects(a[key], b[key]);
        if (deepCompare.length > 0) acc.push(deepCompare);
      } else {
        // 2) if the value is a primitive, check its equality
        if (a[key] != b[key]) {
          acc.push([a[key], b[key]]);
        }
      }
    } else {
      acc.push([a[key], b[key]]);
    }
    return acc;
  }, []);
};
