export function handler(event, context, callback) {
  var {
    SPOTIFY_CLIENT_ID, 
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI
  } = process.env;

  
  console.log(event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!", SPOTIFY_CLIENT_ID})
  })
}
