exports.handler = function (event, context, callback) { // event contiene le informazioni sulla richiesta in arrivo quindi possiamo usare questo parametro per estrarre i dati inseriti dall'utente
const secretContent = `
    <h3>Welcome to the secret area</h3>
    Il cielo è <strong>blu</strong> e 2 più 2 fa 4
`
    let body

    event.body ? body = JSON.parse(event.body) : body = {} // se esiste una richiesta, il testo effettivo inserito, la vogliamo postare come dati JSON cioè trasformarla in JS, se no il corpo sarà un oggetto vuoto

    body.password == "javascript" ? callback(null, { statusCode: 200, body: secretContent }) : callback(null, {
        statusCode: 401 }) // se la password nel body è quella prevista allora richiama la funzione che mostra il risultato (200 è successo), se no mostra errore

    }