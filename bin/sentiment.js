#!/usr/bin/env node
var sentiment = require('sentiment');
var ls = require('line-stream')();
var argv = require('optimist').argv;
var text = argv._.join(' ');

var dict = {};

if(argv.help || process.argv.length < 3){
  console.log("HELP:");
  console.log("\nthis is a program that exposes the node module 'sentiment' by diy as a command line tool and an http service.\n")
  console.log(" you may pass any text as any series of unlabeld arguments");
  console.log("\texample> sentiment i am text that will be scored");
  console.log(" --dict path/to/dictionary.json") 
  console.log("\tuse this to override word scores or add new words")
  console.log(" --port portnumber")
  console.log("\tif port is specified this will bind an http server that exposes a text scoring web service. POST body or GET ?text=texthere")
  console.log(" --help")
  console.log("\tprints this help");
  process.exit();
}

if(argv.dict) {  
  dict = require(process.cwd()+'/'+argv.dict)||{};
}

if(argv.port !== undefined) {
  console.log('starting in http server mode!');

  var server = require('../server')(dict);
  server.listen(argv.port,'0.0.0.0',function(){

    var address = server.address();
    console.log('listening on ',address);
    console.log('use it by making an http request to this:')
    console.log('\thttp://localhost:'+address.port+'?text=hi%20i%20am%20a%20good%20seahorse');

  });

} else {

  if(text.length) {

    sentiment(text,dict,function(err,data){
      process.stdout.write(JSON.stringify({text:text,error:err,data:data})+"\n");
    });
   
  } else {

    process.stdin.pipe(ls).on('data',function(line){

      sentiment(line,dict,function(err,data){
        process.stdout.write(JSON.stringify({text:line,error:err,data:data})+"\n");
      });

    });

  }

}
