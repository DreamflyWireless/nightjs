describe('`$()`', function(){
  it('return night collection which is instance of `$.night.N` and `Array`', function(){
    var $night = $()
    expect($night instanceof $.night.N).toBe(true)
    expect($night instanceof Array).toBe(true)
  })
  xit('`$(selector)`', function(){
    var $findme = $()
    expect($findme.length in $findme).toBe(false)
    expect(-($findme.length + 1) in $findme).toBe(false)
  })
})

describe('`.get()` retrieve the DOM elements matched by the night collection.', function(){
  it('`.get(index)` retrieve one of the elements matched by the night collection', function(){
    var $findme = $('#find1 .findme')
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
