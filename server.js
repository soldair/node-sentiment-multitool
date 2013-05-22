var http = require('http');
var url = require('url');
var sentiment = require('sentiment');

module.exports = function(dict){
  dict = dict||{};
  var server;
  server = http.createServer(function(req,res){
    var data = [];
    req.on('data',function(){
      data.push(buf);
    }).on('end',function(){
      if(data.length) {

        data = Buffer.concat(data).toString()

      } else {
        data = '';
        var parsed = url.parse(req.url,true);
        if(parsed.query && parsed.query.text) {
          //
          data = parsed.query.text;
        }
      }

      if(data) {
        sentiment(data,dict,function(err,score){
          res.end(JSON.stringify({error:err,data:score,text:data})+"\n");
        });
      } else {
        res.end(JSON.stringify({error:"?text=the text you want to check or post it as the request body"})+"\n")
      }
    });
  });

  return server;

}
