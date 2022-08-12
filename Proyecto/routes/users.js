const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const userController = require("../controllers/userController.js");
let db = require("../src/database/models");

const guestMiddleware = require("../middleware/guestMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const { check, validationResult, body } = require("express-validator");

let user = db.Usuario;

const validation = [
  body("name")
    .notEmpty().withMessage(" ")
    .isLength({ min: 2 })
    .withMessage(" "),
  body("lastName")
    .notEmpty()
    .withMessage(" ")
    .isLength({ min: 2 })
    .withMessage(" "),
  body("mail")
    .notEmpty()
    .withMessage(" ")
    .bail()
    .isEmail()
    .withMessage(" ")
    .custom((userEmail) => {
      return new Promise((resolve, reject) => {
        user.findOne({ where: { mail: userEmail } }).then((emailExist) => {
          if (emailExist !== null) {
            reject(new Error(" "));
          } else {
            resolve(true);
          }
        });
      });
    }),
  body("dni").notEmpty()
  .withMessage(" "),
  body("address").notEmpty()
  .withMessage(" "),
  body("password")
    .isString()
    .notEmpty()
    .withMessage(" ")
    .isLength({ min: 8 })
    .withMessage(" ")
    .isStrongPassword()
    .withMessage(
      " "
    ),
];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var cargaArchivo = multer({ storage: storage });

router.post("/", cargaArchivo.any("image"), validation, userController.store);

router.get("/registro", guestMiddleware, userController.registro);

router.get("/login", guestMiddleware, userController.login);

router.post("/login", userController.loginProcess);

router.get("/profile", authMiddleware, userController.profile);

router.get("/logout", userController.logout);

router.get("/edit/:id", authMiddleware, userController.edit);

router.put("/edit/:id", userController.confirmEdit);

module.exports = router;
