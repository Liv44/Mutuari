const express = require("express");
const sqlite3 = require("sqlite3");

const dbname = "database.db";
//Ouvertue de la base de données
let db = new sqlite3.Database(dbname, (err) => {
  if (err) throw err;

  console.log("Database connected to " + dbname);
});
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS material (id integer NOT NULL  PRIMARY KEY  AUTOINCREMENT, name text NOT NULL,description longtext)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS user ( id integer NOT NULL  PRIMARY KEY  AUTOINCREMENT, isAdmin  boolean NOT NULL DEFAULT false, firstname text NOT NULL, lastname text NOT NULL, email text NOT NULL, passwordhashed text NOT NULL);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS borrow (  isValidated boolean NOT NULL DEFAULT false, userID integer NOT NULL, materialID integer NOT NULL, startDate date NOT NULL, endDate date NOT NULL, FOREIGN KEY ( userID ) REFERENCES user( id ) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY ( materialID ) REFERENCES material( id ) ON DELETE CASCADE ON UPDATE CASCADE );"
  );
  console.log("Tables created");
});

const app = express();
const PORT = process.env.PORT || 3001;
app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.get("/users", function (req, res) {
  db.all(
    "SELECT id, firstname, lastname, email, isAdmin FROM user",
    function (err, result) {
      if (err) throw err;

      res.send(result);
    }
  );
});
app.get("/materials", function (req, res) {
  db.all("SELECT * FROM material", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.get("/borrow", function (req, res) {
  db.all("SELECT * FROM borrow", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.get("/materials/:id", function (req, res) {
  db.get(
    "SELECT * FROM material WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});
app.get("/users/:id", function (req, res) {
  db.get(
    "SELECT firstname, lastname, isAdmin, email FROM user WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});
// db.close((err) => {
//   if (err) throw err;
//   console.log("Database closed");
// });
