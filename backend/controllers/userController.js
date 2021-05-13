const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

function signUp(req, res) {
  //Sign up
  models.users
    .findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              firstname: req.body.firstname,
              secondname: req.body.secondname,
              phonenumber: req.body.phonenumber,
              email: req.body.email,
              password: hash,
            };

            //validation
            const schema = {
              firstname: { type: "string", optional: false, max: "16" },
              secondname: { type: "string", optional: false, max: "16" },
              phonenumber: { type: "string", optional: false, max: "15" },
              email: { type: "string", optional: false },
              password: { type: "string", optional: false },
            };

            const v = new Validator();
            const validationResponse = v.validate(user, schema);

            if (validationResponse !== true) {
              return res.status(400).json({
                message: "Validation failed",
                error: validationResponse,
              });
            }

            models.users
              .create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something went wrong!",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function login(req, res) {
  models.users
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                "secret",
                {
                  expiresIn: 3600,
                },
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication successful!",
                    token: token,
                    result: result,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid credentials!",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
};
