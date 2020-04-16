exports.handler = function (event, context, callback) {
const secretContent = `
    <h3>Welcome to the secret area</h3>
    Il cielo è <strong>blu</strong> e 2 più 2 fa 4
`
    let body

    event.body ? body = JSON.parse(event.body) : body = {} 

    body.password == "javascript" ? callback(null, { statusCode: 200, body: secretContent }) : callback(null, {
        statusCode: 401})

    }