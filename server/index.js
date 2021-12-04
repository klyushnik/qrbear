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