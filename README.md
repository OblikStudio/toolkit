## Todo

- improve behavior when a node is removed and immediately added in the same mutation
- smart queries with > < + - &
- turn drag.js to event emitter
- check performance issue? of drag.js on mobile when dragging with multiple fingers
- add tests: missing child modules, custom modules
- disallow unregistered modules?
- make unregistered modules extend a simpler class, not Composite that also has EventEmitter

## Definitions

modules = bits, composites, components

bit = module consiting of one element, providing minimal functionality and no styles
composite = module consisting of an element and submodules (other elements), providing advanced functionality and no styles
component = like a composite, but provides styling and may provide more advanced functionality 

node.minibits = {
  bits: {
    height,
    toggle
  },
  composites: {
    carousel,
    carousel-content
  },
  components: {
    pop,
    pop-content
  }
}
