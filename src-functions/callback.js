var querystring = require('querystring');
var stateKey = 'spotify_auth_state';

export function handler(event, context, callback) {
  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  var code = req.queryStringParameters.code || null;
  var state = req.queryStringParameters.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    callback(null, {
      statusCode: 301,
      headers: { "Location": '/#' + 
        querystring.stringify({
          error: 'state_mismatch'
        })}
    })
  } else {
    var headers = { "Set-Cookie": `${stateKey}=0`}

    callback(null, {
      statusCode: 301,
      headers: headers
    })
  }

  console.log(event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({event})
  })
}