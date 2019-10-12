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