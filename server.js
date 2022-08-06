// jshint esversion:6
const dotenv =require("dotenv");
dotenv.config();

const express = require("express");
const colors =require( "colors");
const cors = require("cors");
const NcbiRoutes = require("./routes/Ncbi.js");
const EbiRoutes =require( "./routes/Ebi.js");
const path = require("path");
// const moduleURL = new URL(const.meta.url);
// const __dirname = path.dirname(moduleURL.pathname);

const app = express();

// ----------------------------middleware

app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// ----------------------------get requests

app.use("/internal", NcbiRoutes);
app.use("/toolname", EbiRoutes);
// console.log(__dirname+"/client/build")

if (process.env.NODE_ENV === "production") {
  // serves any static file
  app.use(express.static(path.join(__dirname+"/client/build")));

  // Handle react routing, return all request to react app
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname+"client/build/index.html"))
  });
}

// ---------------------------listen requests

app.listen(PORT, function () {
  console.log(`server has started on port ${PORT}`.yellow.bold);
});
