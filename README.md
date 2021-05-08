# vue-window-size

[![npm version](https://badge.fury.io/js/vue-window-size.svg)](https://badge.fury.io/js/vue-window-size)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![CI Status](https://github.com/mya-ake/vue-window-size/workflows/Main%20Workflow/badge.svg)

> Provides reactivity window size properties for Vue.js.

## Install

### for Vue v3

The following command installs vue-window-size v1.

```bash
$ yarn add vue-window-size
// or
$ npm i vue-window-size
```

### for Vue v2

The following command installs vue-window-seize v0.

```bash
$ yarn add vue-window-size@0.6.2
// or
$ npm i vue-window-size@0.6.2
```

---

You can install v1 using the following command.  
When using with vue-window-size v1 it depends on the [@vue/composition-api](https://github.com/vuejs/composition-api).
And requires Vue.js v2.6 or higher.

> note: v1.1.0 or later is for vue3 only

```bash
$ yarn add vue-window-size@1.0.x @vue/composition-api
// or
$ npm i vue-window-size@1.0.x @vue/composition-api
```

## Usage

[Composition API](#Composition_API) or [Plugin](#Plugin) or [Mixin](#Mixin).

|                             | Composition API |     Plugin     |    Mixin    |
| :-------------------------: | :-------------: | :------------: | :---------: |
| has window sizes properties |   only in use   | all components | only in use |
|     handle resize event     |   only in use   |   all times    |  all times  |

### Composition API

Use with component.

```JavaScript
<template>
  <div>
    <p>window width: {{ windowWidth }}</p>
    <p>window height: {{ windowHeight }}</p>
  </div>
</template>

<script>
import { useWindowSize } from 'vue-window-size';

export default {
  setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
    };
  },
};
</script>
```

> note: useWindowSize handles a Resize Event only when it is in use.
> Even if it is called by multiple components, the Resize event is processed only once.
> If it is not used, it will not be handled.

### Plugin

Install plugin

```JavaScript
import { createApp } from 'vue';
import App from "./App.vue";  // your App component
import { VueWindowSizePlugin } from 'vue-window-size/option-api';

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

```HTML
<template>
  <div>
    <p>window width: {{ $windowWidth }}</p>
    <p>window height: {{ $windowHeight }}</p>
  </div>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size/option-api';

export default {
  mixins: [vueWindowSizeMixin()],
};
</script>
```

## Config for Option API

### `delay` (option)

- type: `Number`
- default: `33`
  - About 30 FPS

Change delay time of resize event.

e.g.

```JavaScript
import { createApp } from 'vue';
import App from "./App.vue";  // your App component
import { VueWindowSizePlugin } from 'vue-window-size/option-api';

const app = createApp(App);
app.use(VueWindowSizePlugin, {
  delay: 100,
});
```

## Public API for Option API

### `config(config: VueWindowSizeOptionApiConfig)`

Same as config for Option API.

```JavaScript
import { vueWindowSizeAPI } from 'vue-window-size/option-api';

vueWindowSizeAPI.config({
  delay: 100,
});
```

### `init()`

Initialize the plugin.
Usually called automatically.
Please call it if you want to use it again after destroy.

```JavaScript
import { vueWindowSizeAPI } from 'vue-window-size/option-api';

vueWindowSizeAPI.init();
```

### `destroy()`

Remove the resize event.

```JavaScript
import { vueWindowSizeAPI } from 'vue-window-size/option-api';

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
