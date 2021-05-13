const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
const patientRoute = require("./routes/patient");
app.use("/patient", patientRoute);

const userRoute = require("./routes/user");
app.use("/user", userRoute);

module.exports = app;
