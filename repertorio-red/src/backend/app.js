/* 
Index
1. Server Configuration
2. MySQL Connection
3. Queries to DB
    - Root query
    - Any TABLE any COLUMN query
    - Customizable query for Composer Table
    - Customizable query for any Obra
    - Auth
4. PDF download
5. INSERT 
    - Add Obra
    - Add Composer
    - Delete any TABLE any COLUMN query
6. EDIT 
    - Edit obra
    - Edit Composer
7. Other functions
    - deleteFolderRecursively()
    - String.hash()
    */
// ---------------- Server Configuration -------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('file-system');

const app = express();
app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.sendStatus(200);
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

app.listen(3001, () => {
    console.log("Listening 3001");
});

// -------------------------- Queries to DB ------------------------ //
app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.get("/api/:table/:column", (req, res) => {

    let sql = `SELECT ${req.params.column} FROM ${req.params.table}`

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
});

app.get("/api/compositor/:nombre/:pais/:periodo", (req, res) => {

    let nombre = req.params.nombre || "*";
    let pais = req.params.pais || "*";
    let periodo = req.params.periodo || "*";

    let sql = "SELECT compositor.*, pais.Pais, periodo.Periodo \
    FROM compositor \
    INNER JOIN pais ON compositor.Pais = pais.ID \
    INNER JOIN periodo ON compositor.Periodo = periodo.ID \
    WHERE ";

    let c = 0;

    if (nombre !== "*") {
        sql += `compositor.Compositor = '${nombre}'`
        c++;
    }

    if (pais !== "*") {
        if (c !== 0) {
            sql += " AND "
        }
        c++;
        sql += `pais.ID = ${pais}`
    }

    if (periodo !== "*") {
        if (c !== 0) {
            sql += " AND "
        }
        c++;
        sql += `periodo.ID = ${periodo}`
    }

    if (c === 0) {
        sql = sql.substring(0, sql.length - 6);
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        let parsedData = JSON.stringify(result);
        res.send(parsedData);
    });
});

app.get("/api/obra/:nombre/:compositor/:tonalidad/:nivel/:esArreglo", (req, res) => {

    console.log(req.params);
    let nombre = req.params.nombre || "*";
    let compositor = req.params.compositor || "*";
    let tonalidad = req.params.tonalidad || "*";
    let nivel = req.params.nivel || "*";
    let esArreglo = req.params.esArreglo;

    if (esArreglo === "false") {
        esArreglo = 0;
    } else if (esArreglo === "true") {
        esArreglo = 1;
    } else {
        esArreglo = "*"
    }

    let sql = "SELECT obra.*, tonalidad.Tonalidad, compositor.Compositor \
    FROM obra \
    INNER JOIN compositor ON compositor.ID = obra.Compositor \
    INNER JOIN tonalidad ON tonalidad.ID = obra.Tonalidad \
    WHERE "

    let c = 0;

    if (nombre !== "*") {
        sql += `obra.Obra LIKE '%${nombre}%'`
        c++;
    }

    if (compositor !== "*") {
        if (c !== 0) {
            sql += " AND "
        }
        c++;
        sql += `compositor.ID = ${compositor}`
    }

    if (tonalidad !== "*") {
        if (c !== 0) {
            sql += " AND "
        }
        c++;
        sql += `tonalidad.ID = ${tonalidad}`
    }

    if (nivel !== "*") {
        if (c !== 0) {
            sql += " AND "
        }
        c++;
        sql += `obra.nivel = '${nivel}'`
    }

    if (esArreglo !== "*") {
        sql += `obra.esArreglo = '${esArreglo}'`
    }

    //------- No parameters = No WHERE condition in sql
    if (c === 0) {
        sql = sql.substring(0, sql.length - 6);
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err.sqlMessage, err.sql);
            return;
        }

        let parsedData = JSON.stringify(result);
        res.send(parsedData);
    });
});

// ------------------------ Auth ------------------------------

app.get("/admin/auth/:pass", (req, res) => {
    var password = req.params.pass;
    
    let sql = "SELECT password FROM auth";

    db.query(sql, (err, result) => {
        result[0].password == password.hashCode() ? res.sendStatus(200) : res.sendStatus(403)
    })
});

// -------------------------- PDF ------------------------------------

app.get("/api/obra/download/:id", (req, res) => {

    let id = req.params.id;

    let sql = `SELECT Obra, Nivel FROM obra WHERE ID = ${id}`;

    db.query(sql, (err, result) => {
        if(err || result.length === 0){
            res.sendStatus(500);
        }
        else{
        let dir = `./Obras/${result[0].Nivel}/${result[0].Obra}/${result[0].Obra}.pdf`;
        try {
            res.download(dir);
        }catch (err) {
            res.sendStatus(502);
        }}
    });
});

// --------------- ADD REG REQUESTS ---------------------

app.post("/api/add/obra", (req, res) => {
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

app.post("/api/add/compositor", (req, res) => {
    let compositor = req.body.compositor;
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

// -------------------- DEL REG REQUESTS -------------------------------------

app.post("/api/:table/del/:id", (req, res) => {

    let id = req.params.id;
    let table = req.params.table;
    console.log(req.params)
    let sql;

    //Si es una Obra hay que eliminar la carpeta en la que está el PDF
    if (table === "obra") {

        sql = `SELECT Obra, Nivel FROM obra WHERE ID = ${id} `;
        console.log(sql);
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(result);
            let dir = `./Obras/${result[0].Nivel}/${result[0].Obra}`;

            deleteFolderRecursive(dir);
        })
    }

    sql = `DELETE FROM ${table} WHERE ID = '${id}'`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        res.sendStatus(500);
    });
});

// ------------------ EDIT REG REQUESTS ------------------

app.post("/api/edit/obra/:id", (req, res) => {

    let id = req.params.id;

    let sql1 = `SELECT ID FROM compositor WHERE Compositor = '${req.body.compositor}'`;
    let sql2 = `SELECT ID FROM tonalidad WHERE Tonalidad = '${req.body.tonalidad}'`;
    let sql = sql1 + " ; " + sql2;

    let esArreglo;

    req.body.esArreglo ? esArreglo = 1 : esArreglo = 0;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        let data = {
            Obra: req.body.nombre,
            Compositor: result[0][0].ID,
            Tonalidad: result[1][0].ID,
            Nivel: req.body.nivel,
            esArreglo: esArreglo
        }

        sql = `UPDATE obra SET ? WHERE ID = ${id} `;

        let dir = `./Obras/${req.body.nivel}/${req.body.nombre}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        db.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            res.sendStatus(500);
        });
    });
})

app.post("/api/edit/compositor/:id", (req, res) => {
    let id = req.params.id;
    let pais = req.body.pais;
    let periodo = req.body.periodo;

    let sql1 = `SELECT ID FROM pais WHERE Pais = '${pais}'`;
    let sql2 = `SELECT ID FROM periodo WHERE Periodo = '${periodo}'`;
    let sql = sql1 + " ; " + sql2;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        let data = {
            Compositor: req.body.compositor,
            Pais: result[0][0].ID,
            Periodo: result[1][0].ID,
            Descripcion: req.body.descripcion
        }

        sql = `UPDATE compositor SET ? WHERE ID = ${id} `;

        db.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            res.sendStatus(500);
        });
    });
});
// ---------------- Funciones Varias --------------------

//FIle System

const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
module.exports = app