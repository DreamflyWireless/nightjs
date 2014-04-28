describe('Static methods on `$`', function(){
  it('$.isFunction', function(){
    expect( $.isFunction(function(){}) ).toBe(true)
    expect( $.isFunction(new Function()) ).toBe(true)

    var f1 = function(){}
    function f2(){}

    expect( $.isFunction(f1) ).toBe(true)
    expect( $.isFunction(f2) ).toBe(true)

    expect( $.isFunction() ).toBe(false)
    expect( $.isFunction(undefined) ).toBe(false)
    expect( $.isFunction({}) ).toBe(false)
    expect( $.isFunction(new Object()) ).toBe(false)
    expect( $.isFunction(null) ).toBe(false)
    expect( $.isFunction([]) ).toBe(false)
    expect( $.isFunction(1) ).toBe(false)
    expect( $.isFunction('a') ).toBe(false)
    expect( $.isFunction(new Date()) ).toBe(false)
    expect( $.isFunction(window) ).toBe(false)
    expect( $.isFunction($('body')) ).toBe(false)
  })
})

describe('`$()` factory always return night collection which is instance of `$.night.N` and `Array`', function(){
  it('`$()`', function(){
    var $night = $()
    expect($night instanceof $.night.N).toBe(true)
    expect($night instanceof Array).toBe(true)
  })
  it('`$(selector)`', function(){
    var $el = $('#some_element')
      , el = document.getElementById('some_element')

    expect($el instanceof $.night.N).toBe(true)
    expect($el instanceof Array).toBe(true)

    expect($el.length).toBe(1)
    expect($el.length in $el).toBe(false)
    expect(-($el.length + 1) in $el).toBe(false)
    expect($('p').length).toBe(3)
    expect($('p > span.yay').length).toBe(1)

    expect($el[0]).toBe(el)
  })
  it('`$(nightCollection)`', function(){
    var $el = $('#some_element')
    expect($($el) instanceof $.night.N).toBe(true)
    expect($($el) instanceof Array).toBe(true)
    expect($($el)[0]).toBe($el[0])
  })
  it('`$(element)`', function(){
    var el = document.getElementById('some_element')
      , $el = $(el)
    expect($el instanceof $.night.N)
    expect($el instanceof Array)
    expect($el[0]).toBe(el)
  })
  xit('`$(nodeList)`', function(){

  })
  it('Be compatible with `$(specialInput)`', function(){
    expect($(null) instanceof $.night.N).toBe(true)
    expect($(undefined) instanceof $.night.N).toBe(true)
    expect($(false) instanceof $.night.N).toBe(true)
    expect($('') instanceof $.night.N).toBe(true)
    
    expect($(null).length).toBe(0)
    expect($(undefined).length).toBe(0)
    expect($(false).length).toBe(0)
    expect($('').length).toBe(0)

    expect($(null)).not.toBe($(null))
  })
})

describe('.toString()', function(){
  it('return a string of \'[object Night]\'', function(){
    expect($().toString()).toBe('[object Night]')
  })
})

describe('`.get()` retrieve the DOM elements matched by the night collection.', function(){
  it('`.get(index)` retrieve one of the elements matched by the night collection', function(){
    var $findme = $('#find1 .findme')
      , findme = document.getElementById('find1')
        .getElementsByClassName('findme')
    expect($findme.get(0)).toBe(findme[0])
    expect($findme.get(0)).toBe($findme[0])
    expect($findme.get(-1)).toBe($findme[$findme.length - 1])
    expect($findme.get($findme.length)).toBe(undefined)
    expect( $findme.get( -($findme.length + 1) ) )
      .toBe(undefined)
  })
  it('`.get()` retrieve all elements matched by the night collection', function(){
    var $findme = $('#find1 .findme')
      , findme = $findme.get()
    expect(findme).not.toBe($findme)
    expect($.isArray(findme)).toBe(true)
    expect(findme.length).toBe($findme.length)
  })
})
