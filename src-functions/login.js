export function handler(event, context, callback) {
  var env = process.env;

  console.log(event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!", env: env})
  })
}
