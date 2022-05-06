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
app.use(express.json());

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

//Sélection de tous les emprunts validés d'un utilisateur
app.get("/users/:id/borrow/validated", function (req, res) {
  db.all(
    "SELECT material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate, borrow.isValidated FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id =borrow.userID WHERE user.id = ? AND borrow.isValidated = true",
    req.params.id,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

//Sélection de tous les emprunts non validés d'un utilisateur
app.get("/users/:id/borrow", function (req, res) {
  db.all(
    "SELECT material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate, borrow.isValidated FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id =borrow.userID WHERE user.id = ? AND borrow.isValidated = false",
    req.params.id,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

//
app.get("/materials/:id/borrow/:startdate/:enddate", function (req, res) {
  db.all(
    "SELECT materialID, startDate, endDate FROM borrow WHERE materialID = ?",
    req.params.id,
    function (err, result) {
      if (err) throw err;
      const startDate = new Date(req.params.startdate);
      const endDate = new Date(req.params.enddate);
      let disponibility = true;
      for (let i = 0; i < result.length; i++) {
        const startDateMat = new Date(result[i].startDate);
        const endDateMat = new Date(result[i].endDate);
        if (startDateMat < startDate && endDateMat >= startDate) {
          disponibility = false;
          break;
        } else if (startDateMat <= endDate && endDateMat > endDate) {
          disponibility = false;
          break;
        } else if (startDateMat <= startDate && endDateMat >= endDate) {
          disponibility = false;
          break;
        } else if (startDateMat >= startDate && endDateMat <= endDate) {
          disponibility = false;
          break;
        }
      }
      res.send(disponibility);
    }
  );
});

//Ajouter un nouvel utilisateur
app.post("/adduser", function (req, res) {
  const { firstname, lastname, email, password } = req.body;
  if (firstname === "" || lastname === "" || email === "" || password === "") {
    res.send({ added: false, err: "params" });
    return 1;
  }
  // Vérification du format de l'email
  const regex = new RegExp("@ynov.com$");
  if (!regex.test(email)) {
    res.send({ added: false, err: "format" });
    return 1;
  }

  // Vérification de l'unicité de l'email
  db.all(
    "SELECT id, firstname, lastname, email, isAdmin FROM user WHERE email = ?",
    email,
    function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.send({ added: false, err: "user" });
      } else {
        // Cryptage du mot de passe
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        db.run(
          "INSERT INTO user (firstname, lastname, email, passwordhashed) VALUES (?, ?, ?, ?)",
          [firstname, lastname, email, hashedPassword]
        );
        res.send({ added: true });
      }
    }
  );
});

//Se connecter
app.post("/login", function (req, res) {
  const { email, password } = req.body;

  //Vérification des champs remplis
  if (email === "" || password === "") {
    res.send({ connected: false, err: "User not found" });
  } else {
    //Vérification de l'email
    db.all(
      "SELECT email, passwordhashed, isAdmin FROM user WHERE email=?",
      email,
      function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          const isAdmin = result[0].isAdmin;

          //Vérification du mot de passe
          bcrypt.compare(
            password,
            result[0].passwordhashed,
            function (err, result) {
              if (err) throw err;
              if (result === true) {
                res.send({ connected: true, isAdmin: isAdmin });
              } else {
                res.send({ connected: false, err: "password" });
              }
            }
          );
        } else {
          res.send({ connected: false, err: "user" });
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
