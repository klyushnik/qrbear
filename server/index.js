const cors = require('cors');
const express = require("express");
const mysql = require('mysql');
const PORT = process.env.PORT || 3001;
const app = express();
const wwwpath = __dirname + '/build/';

//necessary for running node and react on same machine
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(wwwpath));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kawaiidesu12',
    database: 'qrbear_inventory',
    multipleStatements: true
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

app.get("/list/:type/", (req, res) => {
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

app.get("/list/:type/:id", (req, res) => {
    let query = "";
    switch (req.params.type){
        case "bincounts":
            query = `SELECT bin.bin_id, bin_name, item_count FROM bin, item_bin WHERE item_bin.item_id = ? AND item_bin.bin_id = bin.bin_id`;
            break;
        case "binitems":
            query = `SELECT item.item_id, item_name, item_count FROM item, item_bin WHERE item_bin.bin_id = ? AND item.item_id = item_bin.item_id`;
            break;
        default:
            query = `SELECT item_id, item_name, item_sku_id FROM item`;
            break;
    }
    con.query(query, [req.params.id], function (err, result) {
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

app.get("/bin/:id", (req, res) => {
    let query = "SELECT * FROM bin WHERE bin_id=" + req.params.id;
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

app.put("/updatecounts", (req, res) => {
    //todo: separate executeQuery() function to reduce repetitive code, can do one for get and one for post/put
    let query = `UPDATE item_bin SET item_count = ? WHERE item_id = ? AND bin_id = ?;`;
    //todo: sanitize input

    con.query(query, [req.body.item_count, req.body.item_id, req.body.bin_id], (err, result) => {
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

//TODO: reorganize add*, update*, delete* into a single function just like list/*

app.post("/addbin", (req, res) => {
    //todo: separate executeQuery() function to reduce repetitive code, can do one for get and one for post/put
    let query = `INSERT INTO bin (bin_name, bin_desc) VALUES (?,?);`;
    //todo: sanitize input
    let bin_name = req.body.bin_name;
    let bin_desc = req.body.bin_desc;

    con.query(query, [bin_name, bin_desc], (err, result) => {
        if(err)
            res.send({result: 'err'})
        else
            res.send({result: 'ok'});
    });
});

app.put("/updatebin", (req, res) => {
    //todo: separate executeQuery() function to reduce repetitive code, can do one for get and one for post/put
    let query = `UPDATE bin SET bin_name = ?, bin_desc = ? WHERE bin_id = ?;`;
    //todo: sanitize input
    let bin_name = req.body.bin_name;
    let bin_desc = req.body.bin_desc;
    let bin_id = req.body.bin_id;

    con.query(query, [bin_name, bin_desc, bin_id], (err, result) => {
        if(err)
            res.send({result: 'err'})
        else
            res.send({result: 'ok'});
    });
});

app.get("/deletebin/:id", (req, res) => {
    let id = req.params.id;
    let query = "DELETE from bin WHERE bin_id = " + id;
    con.query(query, (err, result) => {
        if(err)
            res.send({result: 'err'})
        else
            res.send({result: 'ok'})
    });
});

app.post("/addtobin/", (req, res) => {

    let query = `insert into item_bin(item_id, bin_id, item_count) values (?, ?, ?) on duplicate key update item_count = item_count + ?;`;
    //todo: sanitize input
    let item_id = req.body.item_id;
    let bin_id = req.body.bin_id;
    let item_count = req.body.item_count;

    con.query(query, [item_id, bin_id, item_count, item_count], (err, result) => {
        if(err)
            res.send({result: 'err'})
        else
            res.send({result: 'ok'});
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

app.get('/', function(req, res) {
     res.sendFile(wwwpath + 'index.html');
 })

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});