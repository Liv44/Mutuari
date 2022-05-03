const express = require("express");
const sqlite3 = require("sqlite3").verbose();
var bcrypt = require("bcryptjs");

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
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3001;
app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
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
app.get("/users/:id/borrow", function (req, res) {
  db.all(
    "SELECT material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate, borrow.isValidated FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id =borrow.userID WHERE user.id = ?",
    req.params.id,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/users/:id/borrow", function (req, res) {
  db.all(
    "SELECT material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate, borrow.isValidated FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id =borrow.userID WHERE user.id = ?",
    req.params.id,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

//Ajouter un nouvel utilisateur
app.post("/adduser", function (req, res) {
  const { firstname, lastname, email, password } = req.body;
  if (firstname === "" || lastname === "" || email === "" || password === "") {
    res.send("Error : Missing parameters");
    return 1;
  }
  // Vérification du format de l'email
  const regex = new RegExp("@ynov.com$");
  if (!regex.test(email)) {
    res.send("Format de l'email à revoir.");
    return 1;
  }

  // Vérification de l'unicité de l'email
  db.all(
    "SELECT id, firstname, lastname, email, isAdmin FROM user WHERE email = ?",
    email,
    function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.send("User already exists");
      } else {
        //Vérification du mot de passe
        // const strongRegex = new RegExp(
        //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        //   // by- Nic Raboy
        // );
        // Cryptage du mot de passe
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        db.run(
          "INSERT INTO user (firstname, lastname, email, passwordhashed) VALUES (?, ?, ?, ?)",
          [firstname, lastname, email, hashedPassword]
        );
        res.send("User added");
      }
    }
  );
});

//Se connecter
app.post("/login", function (req, res) {
  const { email, password } = req.body;

  //Vérification des champs remplis
  if (email === "" || password === "") {
    res.send("Error : Missing parameters");
  } else {
    //Vérification de l'email
    db.all(
      "SELECT email, passwordhashed FROM user WHERE email=?",
      email,
      function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          //Vérification du mot de passe
          bcrypt.compare(
            password,
            result[0].passwordhashed,
            function (err, result) {
              if (err) throw err;
              if (result === true) {
                res.send("Connected");
              } else {
                res.send("Wrong password");
              }
            }
          );
        } else {
          res.send("User not found");
        }
      }
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
// db.close((err) => {
//   if (err) throw err;
//   console.log("Database closed");
// });
