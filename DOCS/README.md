# How to import an function?
It's easy! You just need to know what platform you will use.

## ES6 Module or deno:
```js
import {* as AsyncArrayUtilities} from "./directory/AsyncArrayUtils/module.mjs";
//or, if you pack your es6 modules, use a modulet (tiny module)
import {default as function_you_need} from "./directory/AsyncArrayUtils/es6-modulets/function.js";
```

## Node.js or RequireJS:
```
const AsyncArrayUtilities = require("./directory/AsyncArrayUtils"); 
  //we have package.json to shorten paths!
  //or, get a modulet function to conserve memory:
const function_you_need = require("./directory/AsyncArrayUtils/node-modulets/function.js");
```
## (Kinda Old) Browsers
I can understand if you have to support your app in a browser that doesn't support the `import()` notation (it's added in ES2019) so I made a global variable script too.
```html
<script src="./directory/AsyncArrayUtils/global.js" no-module defer async></script>
<!-- Always try async or defer to not block the DOM parser. -->
<script>
AsyncArrayUtils //an Object containing all functions.
</script>
```