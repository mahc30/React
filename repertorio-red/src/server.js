// ---------------- Server Configuration -------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/helloWorld", (req, res) => {
    res.send("Hello World");
});

app.listen(3001, () => {
    console.log("Listening 3001");
});

// --------------------------- MySQL connection --------------------
const mysql = require('mysql');
const db = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'repertoriored',
    dateStrings: true
});

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Mysql connection successful");
});

// -------------------------- Queries to DB ------------------------ //

app.get("/api/:table/:column", (req, res) => {

    let sql = `SELECT ${req.params.column} FROM ${req.params.table}`

    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return;
        }
        console.log("Custom query succesful");
        res.json(result);
    });
});

app.get("/api/compositor", (req, res) => {


    let sql = 'SELECT compositor.*, pais.Pais, periodo.Periodo \
    FROM compositor \
    INNER JOIN pais ON compositor.Pais = pais.ID \
    INNER JOIN periodo ON compositor.Periodo = periodo.ID';

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        let parsedData = JSON.stringify(result);
        console.log(parsedData)
        res.send(parsedData);
    });
});