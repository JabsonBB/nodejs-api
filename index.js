const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
router.get('/produtos', (req, res) =>{
    execSQLQuery('SELECT * FROM products', res);
});
router.get('/produtos/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM products' + filter, res);
});
router.delete('/produtos/:id', (req, res) =>{
    execSQLQuery('DELETE FROM products WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/produtos', (req, res) =>{

    const supplier_ids = req.body.supplier_ids;
    const product_code = req.body.product_code;
    const product_name = req.body.product_name;
    const description = req.body.description;
    const standard_cost = req.body.standard_cost;
    const list_price = req.body.list_price;
    const reorder_level = req.body.reorder_level;
    const target_level = req.body.target_level;
    const quantity_per_unit = req.body.quantity_per_unit;
    const discontinued = req.body.discontinued;
    const minimum_reorder_quantity = req.body.minimum_reorder_quantity;
    const category = req.body.category;
    const attachments = req.body.attachments;

    execSQLQuery(`INSERT INTO products(supplier_ids,product_code,product_name,description,standard_cost,list_price,reorder_level,target_level,quantity_per_unit,discontinued,minimum_reorder_quantity,category,attachments)VALUES('${supplier_ids}','${product_code}','${product_name}','${description}','${standard_cost}','${list_price}','${reorder_level}','${target_level}','${quantity_per_unit}','${discontinued}','${minimum_reorder_quantity}','${category}','${attachments}');`, res);
});
router.patch('/produtos/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const supplier_ids = req.body.supplier_ids;
    const product_code = req.body.product_code;
    const product_name = req.body.product_name;
    const description = req.body.description;
    const standard_cost = req.body.standard_cost;
    const list_price = req.body.list_price;
    const reorder_level = req.body.reorder_level;
    const target_level = req.body.target_level;
    const quantity_per_unit = req.body.quantity_per_unit;
    const discontinued = req.body.discontinued;
    const minimum_reorder_quantity = req.body.minimum_reorder_quantity;
    const category = req.body.category;
    const attachments = req.body.attachments;
    execSQLQuery(`UPDATE products SET supplier_ids = '${supplier_ids}', product_code = '${product_code}', product_name = '${product_name}', description = '${description}', standard_cost = '${standard_cost}', list_price = '${list_price}', reorder_level = '${reorder_level}', target_level = '${target_level}', quantity_per_unit = '${quantity_per_unit}', discontinued = '${discontinued}', minimum_reorder_quantity = '${minimum_reorder_quantity}', category = '${category}', attachments = '${attachments}' WHERE ID=${id}`, res);
})
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');


function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : '',
        database : 'northwind'
    });
   
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }