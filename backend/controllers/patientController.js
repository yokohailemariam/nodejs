const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

function register(req, res) {
  const patient = {
    firstname: req.body.firstname,
    secondname: req.body.secondname,
    phonenumber: req.body.phonenumber,
    city: req.body.city,
    subcity: req.body.subcity,
    date: req.body.date,
  };

  //validation
  const schema = {
    firstname: { type: "string", optional: false, max: "16" },
    secondname: { type: "string", optional: false, max: "16" },
    phonenumber: { type: "string", optional: false, max: "15" },
    city: { type: "string", optional: false },
    subcity: { type: "string", optional: false },
    date: { type: "string", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(patient, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      error: validationResponse,
    });
  }

  models.Patients.create(patient)
    .then((result) => {
      res.status(201).json({
        message: "Patient Created Successfuly!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Some thing went wrong",
      });
    });
}

function showPatients(req, res) {
  models.Patients.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}
module.exports = {
  register: register,
  showPatients: showPatients,
};
