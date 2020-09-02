var SpotifyWebApi = require('spotify-web-api-node');

export function handler(event, context, callback) {


  var spotifyApi = new SpotifyWebApi({
    clientId: 'fcecfc72172e4cd267473117a17cbd4d',
    clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
    redirectUri: 'http://www.example.com/callback'
  });

  var env = process.env;

  console.log(event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!", env: env})
  })
}
