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

// TODO: auto open browser to run test
console.log('Access http://localhost:' + port + '/test/static/index.html to run test')

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
