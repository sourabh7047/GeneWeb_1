// jshint esversion:6
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import colors from "colors";
import cors from "cors";

const app = express();

// ----------------------------middleware

app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.SERVER_PORT;

// ----------------------------get requests

import NcbiRoutes from "./routes/Ncbi.js"
import EbiRoutes from "./routes/Ebi.js"

app.use("/internal", NcbiRoutes);
app.use("/toolname", EbiRoutes);

// ---------------------------listen requests

app.listen(PORT, function () {
  console.log(`server has started on port ${PORT}`.yellow.bold);
});
