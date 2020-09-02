const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keymon");
const requiredLogin = require("../middleware/requireLogin");

router.get("/protected", requiredLogin, (req, res) => {
  res.send("Protegido para verificar loggeo");
});

/**
 * Registro de Usuario
 * User register
 */
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.json({ error: "Please fill all" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "Usuario ya existe con email" });
      }
      bcrypt.hash(password, 14).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Guardado exitosamente" });
          })
          .catch((err) => {
            console.log("Error es:", err);
          });
      });
    })
    .catch((err) => {
      console.log("Signup Error es:", err);
    });
});

/**
 * Inicio de sesión
 * Login
 */
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Falta Usuario o Contrasena" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Email o contrasena incorrectos" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email } = savedUser;
          res.json({ token, user: { _id, name, email } });
        } else {
          return res
            .status(422)
            .json({ error: "Email o contrasena incorrectos C" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
