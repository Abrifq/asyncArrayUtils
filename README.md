# Async Array Utils

Just some async functions you can use with array.
Most of them are replicas of already existing array functions (map,forEach,some,every, etc.)

There is a `extendedIndexOf` function set if you wanted to search via functions' result instead of just comparing values/references.

## 3 Ways of Imports are available!

### 1. Node
Since we have a package.json in, it should be possible to import via
```js
const asyncArrayUtils = require("./*path*/asyncArrayUtils");
```
but if it doesn't work for some reason, just put `node.js` at the end of it!
```js
const asyncArrayUtils = require("./*path*/asyncArrayUtils/node.js");
```

### 2. Browser (global importing)
Just include it via a simple `<script>` tag.
```html
<script src="path/asyncArrayUtils/global.js"></script>
```
You can access the functions via `asyncArrayUtils` global object.

### 3. Module ("mjs", usable in `import {func} from ""`)
  a. Inside a module scope (`.mjs` extension on file or `module` attribute on `<script>`) 
  Can be included via the line below:
  ```js
import * as asyncArrayUtils from "./*path*/asyncArrayUtils/module.mjs";
  ```

  b. Outside a module file (if you are not in, you're out.)
  ```js
  import("./*path*/asyncArrayUtils/module.mjs")
  ```
  Importing via this way only has one bad thing:
  > the "import" function returns all of the module's exports as **a Promise**.

  Sure, since it's async function collection, you can always do `await import()` but it can trigger errors in your linter. To learn more about `import()` you can read [this MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports).