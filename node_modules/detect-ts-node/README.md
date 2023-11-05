### Install

```shell
npm install --save detect-ts-node
```

### Usage:

```ts
import detectTSNode from "detect-ts-node";

if (detectTSNode) {
  console.log("Code is running in TS Node");
} else {
  console.log("Code is not running in TS Node");
}
```

The detection is based on the discussion in [this issue on the TS Node Github](https://github.com/TypeStrong/ts-node/issues/846)
