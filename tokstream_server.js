var http = require('http')
  , url = require('url')
  , fs = require('fs')

  // opentok
  , opentok = require('opentok')
  , OPENTOK_API_KEY = '' // Replace with your API key
  , OPENTOK_API_SECRET = '' // Replace with your API secret key

// Create instance of opentok SDK
var ot = new opentok.OpenTokSDK(OPENTOK_API_KEY, OPENTOK_API_SECRET);

var server = http.createServer(function(req, res) {
	var path = url.parse(req.url).pathname;

	switch(path) {
		case '/':
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write('<html><head><title>TokStream Demo Server</title></head><body><p>TokStream demo server is currently up.</p></body></html>');
			res.end();
			break;

		case '/api_key':
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write(OPENTOK_API_KEY);
			res.end();
			break;

		case '/session':
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write(ot.sessionId);
			res.end();
			break;

		case '/token':
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write(ot.generateToken({
				'session_id' : ot.sessionId,
				'role' : 'publisher'
			}));
			res.end();
			break;

		case '/admin_token':
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write(ot.generateToken({
				'session_id' : ot.sessionId,
				'role' : 'moderator'
			}));
			res.end();
			break;

		case '/client.html':
      fs.readFile(__dirname + path, function(err, data){
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data, 'utf8');
        res.end();
      });
      break;

		default:
			send404(res);
	}
});

var send404 = function(res) {
	res.writeHead(404);
	res.write('404');
	res.end();
};

console.log("Connecting to TokBox to establish session...");

ot.createSession('localhost', {}, function(sessionId) {
	server.listen(10000);
	console.log("Session Created, server running on port 10000");
});
