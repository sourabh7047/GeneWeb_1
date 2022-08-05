// jshint esversion:6
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import colors from "colors";
import cors from "cors";
import NcbiRoutes from "./routes/Ncbi.js"
import EbiRoutes from "./routes/Ebi.js"

const app = express();

// ----------------------------middleware

app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8080;

// ----------------------------get requests


app.use("/internal", NcbiRoutes);
app.use("/toolname", EbiRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('./project-geneweb/build'))
}

// ---------------------------listen requests

app.listen(PORT, function () {
  console.log(`server has started on port ${PORT}`.yellow.bold);
});
