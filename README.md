# vue-window-size

[![npm version](https://badge.fury.io/js/vue-window-size.svg)](https://badge.fury.io/js/vue-window-size)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![CI Status](https://github.com/mya-ake/vue-window-size/workflows/Main%20Workflow/badge.svg)

> Provides reactivity window size properties for Vue.js.

## Install

```bash
$ yarn add vue-window-size
```

## Usage

[Plugin](#Plugin) or [Mixin](#Mixin).

Plugin all components have window sizes.

Components with mixin have window sizes.
Other components don't have window sizes.

### Plugin

Install plugin

```JavaScript
import Vue from 'vue';
import VueWindowSize from 'vue-window-size';

Vue.use(VueWindowSize);
```

Use with component

```HTML
<template>
  <div>
    <p>window width: {{ windowWidth }}</p>
    <p>window height: {{ windowHeight }}</p>
  </div>
</template>
```

### Mixin

Use with component

```HTML
<template>
  <div>
    <p>window width: {{ windowWidth }}</p>
    <p>window height: {{ windowHeight }}</p>
  </div>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size';

export default {
  mixins: [vueWindowSizeMixin],
};
</script>
```

## Options

### `delay` (option)

- type: `Number`
- default: `33`
  - About 30 FPS

Change delay time of resize event.

e.g.

```JavaScript
import Vue from 'vue';
import VueWindowSize from 'vue-window-size';

Vue.use(VueWindowSize, {
  delay: 100,
});
```

## Public API

### `setDelay(delay: number)`

Same as delay option.

```JavaScript
import { vueWindowSize } from 'vue-window-size';

vueWindowSize.setDelay(1000);
```

### `init()`

Initialize the plugin.
Usually called automatically.
Please call it if you want to use it again after destroy.

```JavaScript
import { vueWindowSize } from 'vue-window-size';

vueWindowSize.init();
```

### `destroy()`

Remove the resize event.

```JavaScript
import { vueWindowSize } from 'vue-window-size';

vueWindowSize.destroy();
```

## FAQ

### When is removeEventListener called?

This library add addEventListener only once, even if it is used in mixin.
So basically you do not need to call removeEventListener.
If you want to call removeEventListener please call [destroy](#destroy) method.

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/mya-ake/vue-window-size/issues) or a [pull request](https://github.com/mya-ake/vue-window-size/pulls).

## License

[MIT](https://github.com/mya-ake/vue-window-size/blob/master/LICENSE)
