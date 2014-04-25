var port
  , connect
  , app
  , http

connect = require('connect')
http = require('http')

port = process.argv[2]
if(!port) port = 4321
else if(port === '-h' || port === '--help'){
  printUsage()
  process()
}
else{
  // make sure `port` is interger
  port = parseInt(port)
  if(isNaN(port)){
    printUsage()
    process(1)
  }
}

app = connect()
  .use(connect.logger('dev'))
  .use(connect.static(__dirname + '/..'))

http.createServer(app).listen(port)

console.log('Listening on port ' + port)

// helper functions
function printUsage(){
  var argv, spliter
  argv = process.argv
  spliter = process.platform === 'win32' ? '\\' : '/'
  console.log(
    'Usage: ' +
    ['node', argv[1].split(spliter).pop(), '<port>'].join(' ')
  )
}
