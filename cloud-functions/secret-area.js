exports.handler = function (event, context, callback) { // event contiene le informazioni sulla richiesta in arrivo quindi possiamo usare questo parametro per estrarre i dati inseriti dall'utente
    const secretContent = `
    <h3>Welcome to the secret area</h3>
    Il cielo è <strong>blu</strong> e 2 più 2 fa 4
`
    let body

    if (event.body) {
        body = JSON.parse(event.body)
      } else {
        body = {}
      }
    
      if (body.password == "javascript") {
        callback(null, {
          statusCode: 200,
          body: secretContent
        })
      } else {
        callback(null, {
          statusCode: 401
        })
      }
    
}