var querystring = require('querystring');
var stateKey = 'spotify_auth_state';

export function handler(event, context, callback) {
  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  var scope = 'user-read-private user-read-email'
  var state = generateRandomString(16);
  var url = 'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })
  
  console.log(event)
  callback(null, {
    statusCode: 301,
    headers: { "Set-Cookie": `${stateKey}=${state}`, "Location": url}
  })
}

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
