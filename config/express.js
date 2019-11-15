var express = require('express');
const bodyParser = require('body-parser');

module.exports = function () {
    var app = express();

    app.use(express.static('./public'))

    //configurando o body parser para pegar POSTS mais tarde
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //setando ejs no Express para redenrizar as páginas
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
 
    return app;
}