const produtoDao = require('../infra/produtoDao')();

const response = (error, results, res) => {
    if (error)
        res.json(error);
    else
        res.json(results);
};

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.json({ message: 'Funcionando!' })
    });

    app.get('/produtos', (req, res) => {
        produtoDao.getProdutosList((error, results) => {
            response(error, results, res);
        });
    });

    app.get('/produtos/:id?', (req, res) => {

        produtoDao.getProdutoById(req.params.id, (error, results) => {
            response(error, results, res);
        });
    });

    app.delete('/produtos/:id', (req, res) => {
        
        produtoDao.deleteProdutoById(req.params.id, (error, results) => {
            response(error, results, res);
        });
    });

    app.post('/produtos', (req, res) => {

        produtoDao.insertProduto(req.body, (error, results) => {
            response(error, results, res);
        });
    });

    app.patch('/produtos/:id', (req, res) => {
        
        produtoDao.updateProduto(req.body, (error, results) => {
            response(error, results, res);
        });
     });

    app.get('/lista_produtos', (req, res) => {

        produtoDao.getProdutosList((error, results) => {
            if(error)
                res.json(error);
            else
                res.render('produtos/lista', {lista: results});
        })
    });
}