# compareobjects

Deeply compare objects in javascript.

Check out some [examples](https://aslamhus.github.io/compareobjects/test/index.html)

## Integration

```js
import { compareObjects } from './compareObject.js';
```

or add the file into your html via a script tag

```html
<script src="./compareObjects.js"></script>
```

## How to use

**compareObjects** takes two objects as parameters and compares them recursively. Since arrays are also objects, you can use this to compare multi-dimensional arrays. Give it a try by checking out the [examples page](https://aslamhus.github.io/compareobjects/test/index.html).

It will `return` an `array` with length 0 if the objects are equal. Otherwise it will return an array of all the mismatching values.

```js
const objA = { a: 'value' };
const objB = { a: 'different value' };
const compare = compareObjects(a, b);
if (compare.length == 0) {
  // objects are equal
} else {
  /**
   * objects are NOT equal
   * in this example compare would return an array
   * with the two unequal values
   * ['value', 'different value' ]
   */
  console.log(compare);
}
```

## Author

@aslamhus
