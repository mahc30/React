// ---------------- Server Configuration -------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('file-system');

const app = express();
app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }))
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
        if (err) {
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


// ---------------------------- HANDLE POST REQUESTS ----------------------------

app.post("/api/post/add/obra", (req, res) => {
    console.log(req.body);
    let obra = req.body.nombre;
    let compositor = req.body.compositor;
    let tonalidad = req.body.tonalidad;
    let nivel = req.body.nivel;
    let esArreglo = req.body.esArreglo;

    let sql1 = `SELECT ID FROM compositor WHERE compositor = '${compositor}'`;
    let sql2 = `SELECT ID FROM tonalidad WHERE tonalidad = '${tonalidad}'`;
    
    db.query(`${sql1}; ${sql2}`, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        let idComp = result[0][0].ID;
        let idTon = result[1][0].ID;

        sql1 = `INSERT INTO obra (Obra, Compositor, Tonalidad, Nivel, EsArreglo) VALUES ('${obra}', ${idComp}, ${idTon}, '${nivel}', ${esArreglo})`;
        db.query(sql1, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            let dir = `./Obras/${nivel}/${obra}`;

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            res.sendStatus(200);
        });
    });
});

app.post("/api/post/add/compositor", (req, res) => {
    let compositor = req.body.nombre;
    let pais = req.body.pais;
    let periodo = req.body.periodo;
    let descripcion = req.body.descripcion;

    let sql = `SELECT ID FROM pais WHERE pais = '${pais}'`;

    db.query(sql, (err, idPais) => {
        if (err) {
            console.log(err);
            return;
        }

        sql = `SELECT ID FROM periodo WHERE periodo = '${periodo}'`;

        db.query(sql, (err, idPeriodo) => {
            if (err) {
                console.log(err);
                return;
            }

            sql = `INSERT INTO compositor (Compositor,Pais,Periodo,Descripcion) VALUES ('${compositor}',${idPais[0].ID},${idPeriodo[0].ID},'${descripcion}')`;
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.sendStatus(200);
            });
        });
    });
});