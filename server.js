// jshint esversion:6
const express = require("express");
const colors = require("colors");
const cors = require("cors");

const app = express();

// ----------------------------middleware

app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.SERVER_PORT;

// ----------------------------get requests

app.use("/internal", require("./routes/Ncbi"));
app.use("/toolname", require("./routes/Ebi"));

// ---------------------------listen requests

app.listen(5000, function () {
  console.log(`server has started on port ${PORT}`.yellow.bold);
});
