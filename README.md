TokStream-Server
================

Example server based on node.js to accompany the TokStream App.

If you'd like to use it, just clone it, fill in your API keys in the
`tokstream_server.js` file, update the URLs in the `client.html` file,
and you've got a basic TokBox server that can create a single session
and a basic client to view the streams in the session.

If you're looking to write your own server, TokStream just needs to get
a plain text session id when getting `/session`, an API key when getting `/api_key`
and a token when getting `/token`. Everything else is up to you!
