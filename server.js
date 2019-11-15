const app = require('./config/express')();
const produtos = require('./app/routes/produtos')(app);

app.listen(3000, () => {
    console.log('Servidor funcionando!');
});
