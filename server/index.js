const cors = require('cors');
const express = require("express");
const mysql = require('mysql');
const PORT = process.env.PORT || 3001;
const app = express();

//necessary for running node and react on same machine
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kawaiidesu12',
    database: 'qrbear_inventory'
});


con.connect((err) => {
    if(err) throw err;
    console.log('connected to sql');
});

app.get("/api", (req, res) => {
    con.query("SELECT * FROM item", function (err, result, fields) {
        if(err) throw err;
        res.json(result);
    });
});

app.get("/list/:type", (req, res) => {
    let query = "";
    switch (req.params.type){
        case "bins":
            query = "SELECT bin_id, bin_name FROM bin";
            break;
        case "locations":
            query = "SELECT loc_id, loc_name, aisle_id FROM location";
            break;
        case "items":
        default:
            query = "SELECT item_id, item_name, item_sku_id FROM item";
            break;
    }
    con.query(query, function (err, result) {
        if(err) throw err;
        res.json(result);
    });
});

app.get("/next/:type", (req, res) => {
    let query = "";
    switch (req.params.type){
        case "bins":
            query = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'qrbear_inventory' AND TABLE_NAME = 'bin'";
            break;
        case "locations":
            query = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'qrbear_inventory' AND TABLE_NAME = 'location'";
            break;
        case "items":
        default:
            query = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'qrbear_inventory' AND TABLE_NAME = 'item'";
            break;
    }
    con.query(query, function (err, result) {
        if(err) throw err;
        res.json(result);
    });
});

app.get("/item/:id", (req, res) => {
    let query = "SELECT * FROM item WHERE item_id=" + req.params.id;
    con.query(query, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.post("/additem", (req, res) => {
    //todo: separate executeQuery() function to reduce repetitive code, can do one for get and one for post/put
    let query = `INSERT INTO item (item_upc, item_name, item_desc, item_sku_id, item_category, item_saleprice) VALUES (?,?,?,?,?,?);`;
    //todo: sanitize input
    let item_upc = req.body.item_upc;
    let item_name = req.body.item_name;
    let item_desc = req.body.item_desc;
    let item_sku_id = req.body.item_sku_id;
    let item_category = req.body.item_category;
    let item_saleprice = req.body.item_saleprice;

    con.query(query, [item_upc, item_name, item_desc, item_sku_id, item_category, item_saleprice], (err, result) => {
        if(err)
            res.send({result: 'err'})
        else
            res.send({result: 'ok'});
    });
});

app.put("/updateitem", (req, res) => {
    //todo: separate executeQuery() function to reduce repetitive code, can do one for get and one for post/put
    let query = `UPDATE item SET item_upc = ?, item_name = ?, item_desc = ?, item_sku_id = ?, item_category = ?, item_saleprice = ? WHERE item_id = ?;`;
    //todo: sanitize input
    let item_upc = req.body.item_upc;
    let item_name = req.body.item_name;
    let item_desc = req.body.item_desc;
    let item_sku_id = req.body.item_sku_id;
    let item_category = req.body.item_category;
    let item_saleprice = req.body.item_saleprice;
    let item_id = req.body.item_id;

    con.query(query, [item_upc, item_name, item_desc, item_sku_id, item_category, item_saleprice, item_id], (err, result) => {
        if(err)
            res.send({result: 'err'})
        else
            res.send({result: 'ok'});
    });
});

app.get("/deleteitem/:id", (req, res) => {
    let id = req.params.id;
    let query = "DELETE from item WHERE item_id = " + id;
    con.query(query, (err, result) => {
        if(err)
            res.send({result: 'err'})
        else
            res.send({result: 'ok'})
    });
});

app.get("/api/:param", (req, res) => {
    con.query("SELECT * FROM item", function (err, result, fields) {
        if(err) throw err;
        //res.json(result);
        res.send(req.params.param);
    });
});

app.post('/api/users', function(req, res) {
    const user_id = req.body.id;
    const token = req.body.token;
    const geo = req.body.geo;
  
    res.send({
      'user_id': user_id,
      'token': token,
      'geo': geo
    });
  });



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});