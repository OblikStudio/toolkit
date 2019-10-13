# Oblik Toolkit

A collection of minimalistic components and utilities. Optionally, the Watcher (inspired by [UIkit](https://getuikit.com/)) can be used to glue them all together and allow them to be used just with HTML markup.

Core values and goals:

1. **Options.** Before everything, Oblik's goal is to help you. It doesn't provide complex do-it-all solutions. Instead, it provides simple functionality that could be extended to fit your own use cases.
1. **Renderless.** Components use as little CSS and DOM mutations as possible. They provide just JavaScript functionality while design and markup are left in your hands, allowing you to achieve a unique look and feel.
1. **Modularity.** The project uses [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) so you can import just the things you need. You can use a single utility function or component, but you can also add a bundle containing everything.
1. **Compatibility.** While modern browsers are the target and modern features are used, everything should be working fine up to IE11. Various parts of the Toolkit could work in even older browsers.

# Usage

First, you have to install Oblik. It's currently not available on npm, but you could add it as a submodule with Git:

```
git submodule add https://github.com/oblikjs/oblik
```

## Utility

The most minimal way to use the Toolkit is to import a single utility. For example, the Drag class. It allows you to handle drag gestures on mobile and desktop at once:

```js
import { Drag } from 'oblik/utils/drag'

let d = new Drag(document.body)
d.on('start', event => {}) // mousedown, touchstart
d.on('move',  event => {}) // mousemove, touchmove
d.on('end',   event => {}) // mouseup, mouseleave, touchend, touchcancel
```

## Component

If you need something more, components provide advanced functionality. They are simple classes (constructor functions) with three arguments:

- `element` to which they are attached to
- `options` that alter the component's behavior
- `parent` component

To be more organized, components are divided into three groups:

- _functional_ do small things like scrolling to a part of the page, monitoring an element's height so it can be animated with CSS, toggling a class based on some user event...
- _interface_ provide the usual slider, accordion, masonry grid...
- _misc_ do random stuff like allowing you to use an HTML element as cursor, splitting text in an element by words so you can animate them...

The Slider component, for example, uses the Drag utility shown earlier. You can use it like this:

```js
import Slider from 'oblik/components/interface/slider'
let Slide = Slider.$components.slide

let sliderEl = document.getElementById('slider')
let slideEls = sliderEl.getElementsByClassName('slide')

let slider = new Slider(sliderEl)

for (let slide of slideEls) {
  new Slide(
    slide,  // element
    null,   // options
    slider  // parent
  )
}

slider.$init()
```

## Watcher

Initializing components in JavaScript with class hooks can become problematic as a project grows. The Watcher allows you to register all components you need and then use attributes to both initialize them and specify options. The slider example from earlier can be done like this:

```js
import Watcher from 'oblik/watcher'
import Slider from 'oblik/components/interface/slider'

let w = new Watcher(document.body, {
  components: {
    slider: Slider
  }
})

w.init()
```

Then, the target element (in this case, `document.body`) will be monitored with a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and components can easily be attached to elements:

```html
<body>
  <div ob-slider>
    <div ob-slider-slide>1</div>
    <div ob-slider-slide>1</div>
    <div ob-slider-slide>3</div>
    <div ob-slider-slide>4</div>
  </div>
</body>
```

### Options

To configure settings from within the markup, you can use the [Single Line Configuration](https://github.com/oblikjs/slic) format, which is basically JSON with a few tweaks that allow it to be used in HTML attributes easier.

Now, you'll see an example with the _toggle_ component. Based on an `on` and `off` handler, it adds/removes a class:

```html
<i ob-toggle="target: @sibling, class: is-shown">?</i>
<div class="tooltip">
  <p>Lorem Ipsum</p>
</div>
```

Here, we set the `target` option to `@sibling` which is used by the [Query](https://github.com/oblikjs/querel) utility to find elements relative to other elements. In this case, the target would be `.tooltip`. The default on/off event is `click` and the added class is set to `is-shown`. The final result is - click events on `<i>` toggle the `is-shown` class on `.tooltip`

#### Defaults

Let's say we want the default handlers to be `mouseover` and `mouseout`. We wouldn't want to specify them on each element. This is where defaults come in handy. They are set on the component's constructor like this:

```js
import Watcher from 'oblik/watcher'
import Toggle from 'oblik/components/functional/toggle'

Toggle.$defaults = {
  target: '@sibling',
  on: 'mouseover',
  off: 'mouseout',
  class: 'is-shown'
}

let w = new Watcher(document.body, {
  components: {
    toggle: Toggle
  }
})

w.init()
```

We can now change the markup to this:

```html
<i ob-toggle>?</i>
<div class="tooltip">
  <p>Lorem Ipsum</p>
</div>
```

And the `is-shown` class will be added to the sibling of the component element on `mouseover` and removed on `mouseout`.

#### Presets

Perhaps we have a lot of toggles that work with `click` and we want that to be the default, but we also have a lot of toggles with mouse triggers. We can move the `on` and `off` options to a preset:

```js
Toggle.$defaults = {
  on: 'click',
  off: 'click',
  class: 'is-active'
}

Toggle.$presets = {
  tooltip: {
    target: '@sibling',
    on: 'mouseover',
    off: 'mouseout',
    class: 'is-shown'
  }
}
```

Now we have default options and a preset that will override those defaults when used. Take the following three examples:

```html
<div class="drawer">
  <button id="one" ob-toggle="target: @parent"></button>
</div>

<i id="two" ob-toggle="tooltip">?</i>
<div class="tooltip">
  <p>Lorem Ipsum</p>
</div>

<div>
  <i id="three" ob-toggle="$preset: tooltip, target: @parent.sibling">?</i>
</div>
<div class="tooltip">
  <p>Lorem Ipsum</p>
</div>
```

1. Default options are used and `.drawer` has `is-active` toggled on `click`
2. When the attribute value is a plain string, it is interpreted as a preset. In this case, `tooltip` is used and the component's sibling would have `is-shown` toggled on mouse events.
3. The same preset is used here too, but the `target` option is overridden. Instead of targeting the component's sibling, we target the sibling of its parent.

#### JavaScript

Keep in mind that you can use the same patterns in JavaScript as well. If you don't use the Watcher, the earlier examples can be done like this:

```js
import Toggle from 'oblik/components/functional/toggle'

Toggle.$defaults = { ... }
Toggle.$presets = { ... }

new Toggle(document.getElementById('one'), {
  target: '@parent'
})

new Toggle(document.getElementById('two'), 'tooltip')

new Toggle(document.getElementById('three'), {
  $preset: 'tooltip',
  target: '@parent.sibling'
})
```

## Customization

### Custom Components

### Extending the Base Component

### Extending Built-In Components