const cors = require('cors');
const express = require("express");
const mysql = require('mysql');
const PORT = process.env.PORT || 3001;
const app = express();

//necessary for running node and react on same machine
app.use(cors());
app.options('*', cors());

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

app.post("additem", (req, res) => {
    //todo: separate executeQuery() function to reduce repetitive code, can do one for get and one for post/put
});

app.get("/api/:param", (req, res) => {
    con.query("SELECT * FROM item", function (err, result, fields) {
        if(err) throw err;
        //res.json(result);
        res.send(req.params.param);
    });
});





app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});