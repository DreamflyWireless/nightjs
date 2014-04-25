(function(window){

// TODO: check whether the same name global variable exist
window.$ = window.simple = $;

var document = window.document,
    Array = window.Array,
    Object = window.Object,
    arraySlice = Array.prototype.slice;
var Night = function(selector){
    if(selector){
        // abbr. elements
        this._els = [];
    }
    else{
        this._els = arraySlice.call(
            document.querySelectorAll(selector), 0
        );
    }
};
Night.prototype = {
    constructor: Night,
    get: function(index){
        return this._els[index];
    },
    // TODO: delegate event
    on: function(eventName, handler){
        this._els.forEach(function(el){
            el.addEventListener(eventName, handler, false);
        });
        return this;
    }
};

// TODO: unit test
$.bind = function(func, context){
    var extraArgs = [],
        startIndex;

    if(context){
        startIndex = 2;
    }
    else{
        context = window;
        startIndex = 1;
    }

    if(arguments.length > startIndex){
        extraArgs = arraySlice.call(arguments, startIndex);
    }

    return function(){
        var args = arraySlice.call(arguments);
        args = args.concate(extraArgs);
        func.apply(context, args);
    };
};

// TODO: unit test
$.isElement = function(obj){
    return obj &&
        (obj instanceof HTMLElement ||
        obj.nodeType === Node.ELEMENT_NODE);
};

// @example $(selector)
// @example $(elements)
function $(selector){
    if(!selector) return [];
    if(typeof selector === 'string'){
        selector = selector.trim();
        return new Night(selector);
    }
    else if(arguments){

    }
}

})(this);
