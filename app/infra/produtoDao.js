const dbConnection = require('../infra/DBConnection');

module.exports = () => {

    this.getProdutosList = (callback) => {
        
        execSQLQuery('SELECT * FROM products', callback);
    };

    this.getProdutoById = (idProduto, callback) => {

        let filter = '';
        if (idProduto) filter = ' WHERE ID=' + parseInt(idProduto);
        execSQLQuery('SELECT * FROM products' + filter, callback);
    };

    this.deleteProdutoById = (idProduto, callback) => {

        execSQLQuery('DELETE FROM products WHERE ID=' + parseInt(idProduto), callback);
    };

    this.insertProduto = (produto, callback) => {

        const supplier_ids = produto.supplier_ids;
        const product_code = produto.product_code;
        const product_name = produto.product_name;
        const description = produto.description;
        const standard_cost = produto.standard_cost;
        const list_price = produto.list_price;
        const reorder_level = produto.reorder_level;
        const target_level = produto.target_level;
        const quantity_per_unit = produto.quantity_per_unit;
        const discontinued = produto.discontinued;
        const minimum_reorder_quantity = produto.minimum_reorder_quantity;
        const category = produto.category;
        const attachments = produto.attachments;

        execSQLQuery(`INSERT INTO products(supplier_ids,product_code,product_name,description,standard_cost,list_price,reorder_level,target_level,quantity_per_unit,discontinued,minimum_reorder_quantity,category,attachments)VALUES('${supplier_ids}','${product_code}','${product_name}','${description}','${standard_cost}','${list_price}','${reorder_level}','${target_level}','${quantity_per_unit}','${discontinued}','${minimum_reorder_quantity}','${category}','${attachments}');`, callback);  
    };

    this.updateProduto = (produto, callback) => {

        const supplier_ids = produto.supplier_ids;
        const product_code = produto.product_code;
        const product_name = produto.product_name;
        const description = produto.description;
        const standard_cost = produto.standard_cost;
        const list_price = produto.list_price;
        const reorder_level = produto.reorder_level;
        const target_level = produto.target_level;
        const quantity_per_unit = produto.quantity_per_unit;
        const discontinued = produto.discontinued;
        const minimum_reorder_quantity = produto.minimum_reorder_quantity;
        const category = produto.category;
        const attachments = produto.attachments;

        execSQLQuery(`UPDATE products SET supplier_ids = '${supplier_ids}', product_code = '${product_code}', product_name = '${product_name}', description = '${description}', standard_cost = '${standard_cost}', list_price = '${list_price}', reorder_level = '${reorder_level}', target_level = '${target_level}', quantity_per_unit = '${quantity_per_unit}', discontinued = '${discontinued}', minimum_reorder_quantity = '${minimum_reorder_quantity}', category = '${category}', attachments = '${attachments}' WHERE ID=${id}`, callback);
    };

    function execSQLQuery(sqlQuery, callback) {
        const connection = dbConnection();

        connection.query(sqlQuery, function (error, results, fields) {
            callback(error, results)
            connection.end();
        });
    }

    return this;
}