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

describe('`$()` factory function always return night collection which is instance of `$._inner.Night` and `Array`, and never return the same even input the same', function(){
  var foo
  // TODO: check `selector` property on night collection

  beforeEach(function(){
    foo = {
      '$': $
    }
    spyOn(foo, '$').and.callThrough
  })

  it('`$()`', function(){
    var $night
    expect(function(){
      $night = $()
    }).not.toThrowError()
    expect($night instanceof $._inner.Night).toBe(true)
    expect($night instanceof Array).toBe(true)
    expect($night).not.toBe($())
  })
  it('`$(selector)`', function(){
    var $el
      , el = document.getElementById('some_element')

    expect(function(){
      $el = $('#some_element')
    }).not.toThrowError()

    expect($el instanceof $._inner.Night).toBe(true)
    expect($el instanceof Array).toBe(true)

    expect($el.length).toBe(1)
    expect($el.length in $el).toBe(false)
    expect(-($el.length + 1) in $el).toBe(false)
    expect($('p').length).toBe(3)
    expect($('p > span.yay').length).toBe(1)

    expect($el[0]).toBe(el)
    expect($el).not.toBe($('#some_element'))
  })
  it('`$(nightCollection)`', function(){
    var $el, $$el
    expect(function(){
      $el = $('#some_element')
      $$el = $($el)
    }).not.toThrowError()
    expect($$el instanceof $._inner.Night).toBe(true)
    expect($$el instanceof Array).toBe(true)
    expect($$el[0]).toBe($el[0])
    expect($$el).not.toBe($($el))
  })
  it('`$(element)`', function(){
    var el = document.getElementById('some_element')
      , $el
    expect(function(){
      $el = $(el)
    }).not.toThrowError()
    expect($el instanceof $._inner.Night)
    expect($el instanceof Array)
    expect($el[0]).toBe(el)
    expect($el).not.toBe($(el))
  })
  xit('`$(nodeList)`', function(){

  })
  describe('`$(specialInput)`', function(){
    var $null
      , $undefined
      , $false
      , $emptyStr
      , $wrongSelector
      , $wrongSelector2
      , $nonexistentEl

    it('is compatible with falsy input or selector of nonexistent element', function(){
      expect(function(){
        $null = $(null)
        $undefined = $(undefined)
        $false = $(false)
        $emptyStr = $('')
        $nonexistentEl = $('#nonexistentEl')
      }).not.toThrowError()

      expect($null instanceof $._inner.Night).toBe(true)
      expect($undefined instanceof $._inner.Night).toBe(true)
      expect($false instanceof $._inner.Night).toBe(true)
      expect($emptyStr instanceof $._inner.Night).toBe(true)
      expect($nonexistentEl instanceof $._inner.Night).toBe(true)

      expect($null.length).toBe(0)
      expect($undefined.length).toBe(0)
      expect($false.length).toBe(0)
      expect($emptyStr.length).toBe(0)
      expect($nonexistentEl.length).toBe(0)

      expect($null).not.toBe($(null))
      expect($undefined).not.toBe($(undefined))
      expect($false).not.toBe($(false))
      expect($emptyStr).not.toBe($(''))
      expect($nonexistentEl).not.toBe($('#nonexistent'))
    })

    it('throws error if input invalid but truthy selector', function(){
      expect(function(){
        $('#')
      }).toThrowError()

      expect(function(){
        $('.')
      }).toThrowError()
    })
  })
})

describe('`.toString()`', function(){
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
