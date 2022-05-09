const express = require("express");
const sqlite3 = require("sqlite3").verbose();
var bcrypt = require("bcryptjs");
const session = require("express-session");

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
    "CREATE TABLE IF NOT EXISTS borrow (  id integer NOT NULL  PRIMARY KEY  AUTOINCREMENT, isRefused boolean NOT NULL DEFAULT false, isValidated boolean NOT NULL DEFAULT false, isBorrowed boolean NOT NULL DEFAULT false, isReturned boolean NOT NULL DEFAULT false, userID integer NOT NULL, materialID integer NOT NULL, startDate date NOT NULL, endDate date NOT NULL, FOREIGN KEY ( userID ) REFERENCES user( id ) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY ( materialID ) REFERENCES material( id ) ON DELETE CASCADE ON UPDATE CASCADE );"
  );
  console.log("Tables created");
});

const app = express();
app.use(express.json());
app.use(
  session({
    key: "userID",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

const PORT = process.env.PORT || 3001;
app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/authentification", function (req, res) {
  if (req.session.user === undefined) {
    res.send({ auth: false });
  } else if (req.session.user.isAdmin === 1) {
    res.send({
      auth: true,
      isAdmin: true,
      userName: req.session.user.firstname + " " + req.session.user.lastname,
    });
  } else if (req.session.user.isAdmin === 0) {
    res.send({
      auth: true,
      isAdmin: false,
      userName: req.session.user.firstname + " " + req.session.user.lastname,
    });
  }
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

app.put("/materials/modify/:id", function (req, res) {
  const id = req.params.id;
  const { name, description } = req.body;
  db.run(
    "UPDATE material SET name = ?, description = ? WHERE id = ?",
    [name, description, id],
    function (err, result) {
      res.send({ modified: true });
    }
  );
});
app.delete("/materials/delete/:id", function (req, res) {
  const id = req.params.id;
  db.run("DELETE FROM material WHERE id = ?", id, function (err, result) {
    res.send({ deleted: true });
  });
});
app.post("/newmaterial", function (req, res) {
  db.run(
    "INSERT INTO material (name, description) VALUES (?, ?)",
    [req.body.name, req.body.description],
    function (err, result) {
      if (err) throw err;
      res.send({ added: true });
    }
  );
});
app.get("/borrow", function (req, res) {
  db.all("SELECT * FROM borrow", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
//Va chercher tous les emprunts validés par l'admin
app.get("/borrow/validated", function (req, res) {
  db.all(
    "SELECT material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id = borrow.userID WHERE isValidated = true",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});
//Va chercher tous les emprunts À VALIDER par l'admin
app.get("/borrow/tovalidate", function (req, res) {
  db.all(
    "SELECT borrow.id, material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id = borrow.userID WHERE isValidated = false AND isRefused=false",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

//Va chercher tous les emprunts REFUSÉS par l'admin
app.get("/borrow/refused", function (req, res) {
  db.all(
    "SELECT borrow.id, material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id = borrow.userID WHERE isRefused=true",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

//Modification du statut de validation de l'emprunt (isValidated ou isRefused)
app.put("/borrow/validation", function (req, res) {
  //Plus tard, ajouter une vérification de l'ID de l'admin
  //pour qu'il n'y ait que lui qui puisse modifier le statut de validation

  const { choice, borrowID } = req.body;
  if (choice == true) {
    //On met isValidated à true
    db.run(
      "UPDATE borrow SET isValidated = true WHERE id = ?",
      borrowID,
      function (err, result) {
        if (err) throw err;
        res.send({ validation: true });
      }
    );
  } else if (choice == false) {
    //On met isRefused à true
    db.run(
      "UPDATE borrow SET isRefused = true WHERE id = ?",
      borrowID,
      function (err, result) {
        if (err) throw err;
        res.send({ rejection: true });
      }
    );
  }
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

//Sélection de tous les emprunts non validés d'un utilisateur
app.get("/users/:id/borrow/:state", function (req, res) {
  if (req.session.user === undefined) {
    res.send("Veuillez vous connecter");
  } else {
    const userID = req.session.user.id;
    let query = "";
    switch (req.params.state) {
      case "tovalidate":
        query =
          "SELECT material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate, borrow.isValidated FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id = borrow.userID WHERE user.id = ? AND borrow.isValidated = false AND borrow.isRefused=false";
        break;
      case "refused":
        query =
          "SELECT material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate, borrow.isValidated FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id = borrow.userID WHERE user.id = ? AND borrow.isRefused = true";
        break;
      case "validated":
        query =
          "SELECT material.name, user.firstname, user.lastname, borrow.startDate, borrow.endDate, borrow.isValidated FROM borrow INNER JOIN material ON material.id = borrow.materialID INNER JOIN user ON user.id = borrow.userID WHERE user.id = ? AND borrow.isValidated = true";
    }
    db.all(query, userID, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  }
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
      res.send({ disponibility: disponibility });
    }
  );
});

app.post("/newborrow", function (req, res) {
  if (req.session.user === undefined) {
    res.send("Veuillez vous connecter");
  } else {
    const { materialID, userID, startDate, endDate } = req.body;
    const userIDFound = req.session.user[0].id;
    db.all(
      "SELECT materialID, startDate, endDate FROM borrow WHERE materialID = ?",
      materialID,
      function (err, result) {
        if (err) throw err;
        let disponibility = true;
        for (let i = 0; i < result.length; i++) {
          const startDateReq = new Date(startDate);
          const endDateReq = new Date(endDate);
          const startDateMat = new Date(result[i].startDate);
          const endDateMat = new Date(result[i].endDate);
          if (startDateMat < startDateReq && endDateMat >= startDateReq) {
            disponibility = false;
            break;
          } else if (startDateMat <= endDateReq && endDateMat > endDateReq) {
            disponibility = false;
            break;
          } else if (startDateMat <= startDateReq && endDateMat >= endDateReq) {
            disponibility = false;
            break;
          } else if (startDateMat >= startDateReq && endDateMat <= endDateReq) {
            disponibility = false;
            break;
          }
        }
        if (disponibility) {
          db.run(
            "INSERT INTO borrow(materialID, userID, startDate, endDate) VALUES (?, ?, ?, ?)",
            [materialID, userIDFound, startDate, endDate],
            function (err, result) {
              if (err) throw err;
              res.send({ added: true, result: result });
            }
          );
        } else {
          res.send({ added: disponibility });
        }
      }
    );
  }
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
    db.all("SELECT * FROM user WHERE email=?", email, function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        const isAdmin = result[0].isAdmin;

        //Vérification du mot de passe
        bcrypt.compare(
          password,
          result[0].passwordhashed,
          function (err, result2) {
            if (err) throw err;
            if (result2 === true) {
              req.session.user = result[0];
              res.json({ connected: true, result: result[0] });
            } else {
              res.send({ connected: false, err: "password" });
            }
          }
        );
      } else {
        res.send({ connected: false, err: "user" });
      }
    });
  }
});
app.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.send("disconnected");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
// db.close((err) => {
//   if (err) throw err;
//   console.log("Database closed");
// });
