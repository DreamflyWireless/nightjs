;(function(window, $){
  var undefined
    , Object = window.Object
    , Array = window.Array
    , arrProto = Array.prototype
    , slice = arrProto.slice
    , IGNORE_PROP_REG = /^([A-Z]|returnValue$|layer[XY]$)/

  /**
  @example .on(eventType[, selector][, data], handler(event)[, one])
  @param eventType {String} one eventType type
  @param [selector] {String}
  @param [data] {anything} if a string is used, `selector`
  must either be provided or explicitly passed as `null` so
  that the data is not mistaken for a selector
  @param handler {Function}
  @param [capture=false] {Boolean}
  **/
  $.fn.on = function(eventType, selector, data, handler, capture){
    var $ = window.night

    // If `eventType` is nonexistent or invalid
    if( !$.isString(arguments[0]) ) return this

    if( $.isFunction(arguments[1]) ){
      capture = arguments[2]
      handler = arguments[1]
      data = undefined
      selector = undefined
    }
    else if( $.isFunction(arguments[2]) ){
      capture = arguments[3]
      handler = arguments[2]
      if( $.isString(arguments[1]) ){
        selector = arguments[1]
        data = undefined
      }
      else{
        throw new Error('Invalide arguments: expect second argument to be a string of selector')
        return this
      }
    }

    this.forEach(function(element){
      element.addEventListener(
        eventType,
        this.bind(element, element, selector, data, handler, capture),
        !!capture || false
      )
    }, proxyHandler)

    return this
  }

  $.fn.off = function(){}

  // @param event {Event} event object
  function proxyHandler(element, selector, data, handler, capture, event){
    var nightEvent = new NightEvent(event)
      , currentTarget
    if(selector){
      currentTarget = $(event.target).closest(selector, element).get(0)
      // TODO: confirm `currentTarget === element`
      if(!currentTarget || currentTarget === element) return
      // TODO: `liveFired` on `nightEvent`
      nightEvent.currentTarget = currentTarget
    }
    return handler.call(currentTarget || element, nightEvent)
  }

  // Constructor for night event which wraps original DOM event object
  // @param event {Event} original DOM event object
  function NightEvent(event){
    var key
      , IGNORE_REG = IGNORE_PROP_REG
      , undefined
    this.originalEvent = event
    for(key in event)
      if(!IGNORE_REG.test(key) && event[key] !== undefined)
        this[key] = event[key]
  }

  NightEvent.prototype = {
    constructor: NightEvent,
    preventDefault: function(){},
    stopImmediatePropagation: function(){},
    stopPropagation: function(){},
    isDefaultPrevented: function(){},
    isImmediatePropagationStopped: function(){},
    isPropagationStopped: function(){}
  }
})(window, night)
