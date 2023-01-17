# vue-window-size

[![npm version](https://badge.fury.io/js/vue-window-size.svg)](https://badge.fury.io/js/vue-window-size)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/mya-ake/vue-window-size/actions/workflows/ci.yml/badge.svg)](https://github.com/mya-ake/vue-window-size/actions/workflows/ci.yml)

> Provides reactivity window size properties for Vue.js. Supports Vue.js v3.x and v2.7 or higher.

## Install

The following command installs vue-window-size v2.

```bash
$ yarn add vue-window-size
// or
$ npm i vue-window-size
```

Note: For use with v2.6, see [here](https://github.com/mya-ake/vue-window-size/tree/v1.2.1#for-vue-v2).

## Usage

[Composition API](#Composition_API) or [Plugin](#Plugin) or [Mixin](#Mixin).

|                             | Composition API |     Plugin     |    Mixin    |
| :-------------------------: | :-------------: | :------------: | :---------: |
| has window sizes properties |   only in use   | all components | only in use |
|     handle resize event     |   only in use   |   all times    |  all times  |

### Composition API

Use with component.

```TypeScript
<script lang="ts">
import { defineComponent } from 'vue';
import { useWindowSize } from 'vue-window-size';

export default defineComponent({
  setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
    };
  },
});
</script>

<template>
  <div>
    <p>window width: {{ windowWidth }}</p>
    <p>window height: {{ windowHeight }}</p>
  </div>
</template>
```

> note: useWindowSize handles a Resize Event only when it is in use.
> Even if it is called by multiple components, the Resize event is processed only once.
> If it is not used, it will not be handled.

### Plugin

Install plugin

```TypeScript
import { createApp } from 'vue';
import App from "./App.vue";  // your App component
import { VueWindowSizePlugin } from 'vue-window-size/plugin';

const app = createApp(App);
app.use(VueWindowSizePlugin);
```

Use with component

```HTML
<template>
  <div>
    <p>window width: {{ $windowWidth }}</p>
    <p>window height: {{ $windowHeight }}</p>
  </div>
</template>
```

### Mixin

Use with component

```TypeScript
<script lang="ts">
import { defineComponent } from 'vue';
import { vueWindowSizeMixin } from 'vue-window-size/mixin';

export default defineComponent({
  mixins: [vueWindowSizeMixin()],
});
</script>

<template>
  <div>
    <p>window width: {{ $windowWidth }}</p>
    <p>window height: {{ $windowHeight }}</p>
  </div>
</template>
```

## Config for Option API

### `delay` (option)

- type: `Number`
- default: `33`
  - About 30 FPS

Change delay time of resize event.

e.g.

```TypeScript
import { createApp } from 'vue';
import App from "./App.vue";  // your App component
import { VueWindowSizePlugin } from 'vue-window-size/plugin';

const app = createApp(App);
app.use(VueWindowSizePlugin, {
  delay: 100,
});
```

## Public API for Option API

### `config(config: VueWindowSizeOptionApiConfig)`

Same as config for Option API.

```TypeScript
import { vueWindowSizeAPI } from 'vue-window-size/plugin'; // or 'vue-window-size/mixin'

vueWindowSizeAPI.config({
  delay: 100,
});
```

### `init()`

Initialize the plugin.
Usually called automatically.
Please call it if you want to use it again after destroy.

```JavaScript
import { vueWindowSizeAPI } from 'vue-window-size/plugin'; // or 'vue-window-size/mixin'

vueWindowSizeAPI.init();
```

### `destroy()`

Remove the resize event.

```JavaScript
import { vueWindowSizeAPI } from'vue-window-size/plugin'; // or 'vue-window-size/mixin'

vueWindowSizeAPI.destroy();
```

## FAQ

### Why is there no Config in the Composition API?

`useWindowSize` is a singleton and handles the resize event.
Therefore, using `useWindowSize(config)` will affect all components in used.
Due to the nature of the Composition API, this is not the desired behavior.
I also think that there are not many use cases that need to be set individually.  
If requested, I will create a `useAtomicWindowSize(config)` that can be set atomically, so please create an issue.
Or create a factory function for `createUseWindowSize(config)`.

### When is the removeEventListener called when using plugin and mixin??

vue-window-size adds addEventListener only once, even if it is used in mixin.
So basically you do not need to call removeEventListener.
If you want to call removeEventListener please call [destroy](#destroy) method.

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/mya-ake/vue-window-size/issues) or a [pull request](https://github.com/mya-ake/vue-window-size/pulls).

## License

[MIT](https://github.com/mya-ake/vue-window-size/blob/master/LICENSE)
