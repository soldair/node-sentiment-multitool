
sentiment-multitool
===================

cli to scan piped text streams or start a web service for sentimint analysis. uses ['sentiment'](https://github.com/thisandagain/sentiment) by diy/@thisandagain 


example
-------

```sh
$> sentiment "hi i am super nice text"
{"text":"hi i am super nice text","error":null,"data":{"score":6,"comparative":1,"tokens":["hi","i","am","super","nice","text"],"words":["super","nice"],"positive":["super","nice"],"negative":[]}}
$>
$> sentiment
HELP:

this is a program that exposes the node module 'sentiment' by diy as a command line tool and an http service.

 you may pass any text as any series of unlabeld arguments
        example> sentiment i am text that will be scored
 --dict path/to/dictionary.json
        use this to override word scores or add new words
 --port portnumber
        if port is specified this will bind an http server that exposes a text scoring web service. POST body or GET ?text=texthere
 --help
        prints this help


```

install
-------

sudo npm install -g sentiment-multitool


