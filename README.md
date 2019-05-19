## Todo

- use parent[moduleName] = moduleInstance when parent has no emit
- emit module remove events similarly to add
- rename moduleAdd, moduleRemove events to module:add and module:remove
- support child modules that don't extend the BaseModule
- add support to Composites that allows arbitrary modules that don't need to be defined and simply emit an elementAdded event with the name, node and options as arguments
- add support to Bits that allows arbitrary modules to be used by simply setting bit[moduleName] = { element, data }
- add init() event
- add tests

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
