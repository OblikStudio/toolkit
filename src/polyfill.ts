import 'core-js/features/object/assign'
import 'core-js/features/object/entries'
import 'core-js/features/array/from'
import 'core-js/features/array/includes'
import 'core-js/features/dom-collections/for-each'
import 'core-js/features/promise'
import { getViewportScroller } from './utils/overflow'

if (!document.scrollingElement) {
  // @ts-ignore
  document.scrollingElement = getViewportScroller()
}
