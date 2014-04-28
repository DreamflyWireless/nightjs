var night = (function(window){
  var undefined
    // * Quicker access
    // * Save native API used to be compatible with that
    // subsequent codes may override native API
    , document = window.document
    , Array = window.Array
    , arrProto = Array.prototype
    , slice = arrProto.slice
    , filter = arrProto.filter
    , Object = window.Object
    , objProto = Object.prototype
    , objProtoToString = objProto.toString
    , Node = window.Node
    , ELEMENT_NODE = Node.ELEMENT_NODE || 1
    , DOCUMENT_NODE = Node.DOCUMENT_NODE || 9
    , READY_REG = /complete|loaded|interactive/
    , NIGHT_INSTANCE_STR = '[object Night]'

    // APIs on this namespace are exported for deeply
    // customizing night.js
    , night = {}
    , $

  // @public
  // @example $()
  //
  // @example $(selector, context)
  // @param selector {String} a CSS selector
  // @param [context] {HTMLDocument|Element|night.N} context in
  // which query elements
  //
  // @example $(nightCollection)
  // @param nightCollection {night.N} night collection
  //
  // @example $(element)
  // @param element {Element} DOM element
  //
  // @example $(nodeList)
  // @param nodeList {NodeList|HTMLCollection} DOM node list
  //
  // @exapmle $(elementArray)
  // @param elementArray {Array} array consist of DOM element
  //
  // @example $(callback)
  // @param callback {Function} callback invoked when DOM is
  // ready
  //
  // TODO:
  // @example $(htmlFragment, ownerDocument)
  // @param htmlFragment {String} a string of html to create
  // @param [ownerDocument] {HTMLDocument}
  //
  // @example $(htmlFragment, attributes)
  // @param htmlFragment
  // @param [attributes]
  //
  // @return {night.N} a night collection
  $ = function(selector, context){
    var dom
    // Still return an empty night collection to make
    // subsequent processing work
    if(!selector) return night.N()

    else if(typeof selector === 'string'){
      selector = selector.trim()

      if( context ){
        if( $.isHTMLDocument(context) &&
          $.isElement(context) &&
          night.isN(context) )
          return $(context).find(selector)
        else{
          console.error('Second argument is invalide')
          return night.N()
        }
      }

      else dom = night.qsa(document, selector)
    }

    // Shallow copy to create a new night collection
    else if( night.isN(selector) )
      return night.N( selector.slice() )

    else if( $.isElement(selector) )
      dom = [selector], selector = null

    // If first argument is an instance of `NodeList` or
    // `HTMLCollection`, conver it to array
    else if( $.isNodeList(selector) ||
      $.isHTMLCollection(selector) )
      selector = slice.call(selector)

    // If first argument is array, filter out items that are
    // not DOM element
    else if( $.isArray(selector) )
      dom = filter.call(selector, function(item){
        return $.isElement(item)
      })

    else if( $.isFunction(selector) )
      return $(document).ready(selector)

    // Wrap as night collection from the array of nodes found
    return night.N(dom, selector)
  }

  // Factory function for creating night collection
  // @param elementArray {Array|undefined} array consist of
  // DOM elements
  // @param [selector] {String} selector for `dom`
  // @return {night.N}
  night.N = function(elementArray, selector){
    var nightCollection = elementArray || []
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    // Make element array to be night collection by using
    // night collection's prototype as element array's
    // prototype
    Object.setPrototypeOf(nightCollection, $.fn)
    nightCollection.selector = selector || ''
    return nightCollection
  }

  // @public
  // Night collection's prototype.
  // Use `$.fn` as quick accessing and public API for
  // `night.N.prototype`
  $.fn = night.N.prototype
  // The prototype of night collection's prototype is array's
  // prototype, in other words, night collection inherit
  // `$.fn`, and `$.fn` inherit `Array`
  Object.setPrototypeOf($.fn, arrProto)

  // @public
  // Follow the best practice from _JavaScript: the Definitive
  // Guide_ 6th edition: Core JavaScript Reference ->
  // Object.toString()
  $.fn.toString = function(){
    return NIGHT_INSTANCE_STR
  }

  $.fn.get = function(index){
    return index === undefined ?
      // Without a parameter, `.get()` returns an array of
      // all of the elements, but not night collection
      slice.call(this) :
      this[index >= 0 ? index : index + this.length]
  }

  // TODO
  $.fn.on = function(){}

  $.fn.ready = function(callback){
    // `regExp.test()` is faster than `switch`
    // Ref: http://jsperf.com/regexp-test-vs-switch
    if( READY_REG.test(document.readyState) ) callback($)
    else document.addEventListener(
      'DOMContentLoaded',
      function(){
        callback($)
      },
      false
    )
    return this
  }

  // Start: static methods on `$`
  $.isArray = Array.isArray

  ;['Arguments', 'Function', 'String', 'Number', 'Date',
  'RegExp', 'NodeList', 'HTMLCollection', 'HTMLDocument']
  .forEach(function(name){
    this['is' + name] = function(obj){
      return objProtoToString.call(obj) === '[object ' + name + ']'
    }
  }, $)

  $.isElement = function(el){
    return !!(el && el.nodeType === ELEMENT_NODE)
  }

  $.isDocument = function(doc){
    return !!(doc && doc.nodeType === doc.DOCUMENT_NODE)
  }

  // Treat object as what is not primitive
  $.isObject = function(obj){
    return obj === Object(obj)
  }
  // End: static method on `$`

  // TODO: optimize for special cases, eg. `#id`, `.class`
  night.qsa = function(element, selector){
    switch(element.nodeType){
      case ELEMENT_NODE:
      case DOCUMENT_NODE:
        return slice.call( element.querySelectorAll(selector) )
      default:
        return []
    }
  }

  night.isN = function(obj){
    return obj.toString() === NIGHT_INSTANCE_STR
  }

  night.find = function(selector){
    var result
    // Optimize certain case
    if(this.length === 1)
      result = $( night.qsa(this[0], selector) )
    else
      result = this.map(function(){
        return night.qsa(this, selector)
      })
    return result
  }

  // Export internal API in the `$.night` namespace to enable
  // deeply customizing night.js as users of night.js want
  $.night = night

  return $
})(window)

// Make sure exporting `night` to global
window.night = night
// Alias `$` if `$` is not yet defined in global
window.$ === undefined && (window.$ = night)
