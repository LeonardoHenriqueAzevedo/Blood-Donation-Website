// Server
const express = require("express");
const server = express();

// Turn on the server
server.listen(3000, () => {
  console.log("Deu certo");
});

// Body Form 
server.use(express.urlencoded({ extended: true }));

// Connection with the DB
const Pool = require('pg').Pool;
const db = new Pool({
  // Put the information of the DB here 
  user: '',
  password: '',
  host: '',
  port: '',
  database: ''
});

// Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
  express: server,
  noCache: true
});

// Get the donors from the DB
server.get("/", (req, res) => {
  db.query("SELECT * FROM donors", (err, result) => {
    if (err) return res.send("Erro no Banco de Dados");

    const donors = result.rows;
    return res.render("index.html", { donors });
  });
});

// Makes the server shows static files
server.use(express.static('public'))

// Form
server.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;

  if (name == "" || email == "" || blood == "") {
    return res.send("Todos os campos são obrigatórios");
  }

  // Put the values in the db
  const query = `
  INSERT INTO donors ("name", "email", "blood") 
  VALUES ($1, $2, $3)`;
  const values = [name, email, blood];

  db.query(query, values, (err) => {
    // Have Error
    if (err) return res.send("Erro no banco de dados.")

    return res.redirect("/");
  });
});