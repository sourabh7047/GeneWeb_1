// jshint esversion:6
import express from "express";
import https from "https";
import { parseString } from "xml2js";
import cors from "cors";
import bodyParser from "body-parser";
import { SumData } from "./SummaryData.js";
import Espell from "./Espell.js";
import { request } from "http";

const app = express();
app.use(express.json({ extended: false }));

// -----------------------------base site

const base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
const EBIBase = "https://www.ebi.ac.uk/Tools/services/rest";

// -----------------------------variables;
var webEnv = "";
var queryKey = "";
var retstart = 0;
let length = 0;

// ----------------------------middleware
app.use(cors());

// ----------------------------get requests
app.get("/internal/dbinfo", (request, response) => {
  // database list-------
  https.get(base + "einfo.fcgi?", (res) => {
    let body = "";
    res
      .on("data", (chunk) => {
        body += chunk;
      })
      .on("end", () => {
        parseString(body, function (err, result) {
          response.send(result.eInfoResult.DbList[0].DbName);
        });
      })
      .on("error", (err) => {
        console.log("ERROR: " + err.message);
      });
  });
});

// ---------------------------post requests

app.post("/internal/dbinfoData", (request, response) => {
  console.log("initial query received");
  var DBdata = request.body.DBdata;
  var Queryterm = request.body.QueryTerm;
  var newQuery = request.body.QueryTerm;

  https.get(base + "espell.fcgi?db=" + DBdata + "&term=" + Queryterm, (cam) => {
    let body = "";
    cam
      .on("data", (chunk) => {
        body += chunk;
      })
      .on("end", () => {
        Queryterm = Espell(body, Queryterm);
        newQuery = Queryterm.replace(/ /g, "+");
      });
  });

  https.get(
    base +
      "esearch.fcgi?db=" +
      DBdata +
      "&term=" +
      newQuery +
      "&usehistory=y" +
      "&RetStart=" +
      retstart +
      "&retmode=json&idtype=acc",
    (res) => {
      let body = "";
      console.log(res.statusCode + "/");
      res
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          let initialresult = JSON.parse(body);
          length = initialresult.esearchresult.count;
          webEnv = initialresult.esearchresult.webenv;
          queryKey = initialresult.esearchresult.querykey;

          let dataConstruct = {
            length: length,
            webEnv: webEnv,
            queryKey: queryKey,
            dbdata: DBdata,
            page: 1,
          };

          console.log(dataConstruct);

          response.send(dataConstruct);
        })
        .on("error", (err) => {
          console.log("error:" + err.message);
        });
    }
  );
});

app.get(
  "/internal/:dbdata/webenv/:webenv/query/:query/page/:page",
  (request, response) => {
    console.log(request.statusCode + "//");
    let DBdata = request.params.dbdata;
    let webEnv = request.params.webenv;
    let queryKey = request.params.query;
    let page = request.params.page;
    let accStart = (page - 1) * 20;

    https.get(
      base +
        "/esummary.fcgi?db=" +
        DBdata +
        "&query_key=" +
        queryKey +
        "&WebEnv=" +
        webEnv +
        "&retstart=" +
        accStart +
        "&retmax=20&retmode=json",
      (res) => {
        let body = "";
        res
          .on("data", (chunk) => {
            body += chunk;
          })
          .on("end", () => {
            let singleQueryPage = JSON.parse(body);
            let summary = SumData(singleQueryPage, DBdata);

            console.log(summary);

            let comSummary = {
              summary: summary,
            };

            response.send(comSummary);
          })
          .on("error", function (err) {
            console.log(err);
          });
      }
    );
  }
);

app.post("/internal/:dbdata/download/:id", (request, response) => {
  console.log(request.statusCode + "?");
  let dbdata = request.params.dbdata;
  let id = request.params.id;
  let retmode = request.body.retmode;
  let rettype = request.body.rettype;

  https.get(
    base +
      `efetch.fcgi?db=${dbdata}&id=${id}&rettype=${rettype}&retmode=${retmode}`,
    (res) => {
      let body = "";
      res
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          console.log(body);
          response.send(body);
        });
    }
  );
});

app.get(
  "/toolname/parameterDetail/:toolname/:parameter",
  (request, response) => {
    let toolname = request.params.toolname;
    let parameter = request.params.parameter;

    https.get(`${EBIBase}/${toolname}/parameterdetails/${parameter}`, (res) => {
      let body = "";
      res
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          parseString(body, function (err, result) {
            console.log(result.parameter.values[0].value);
            response.send(result.parameter.values[0].value);
          });
        });
    });
  }
);

// ---------------------------listen requests
app.listen(5000, function () {
  console.log("server has started on port 5000");
});

// whenever we get the localhost:300 meaning that something wrong you have done in the frontend request send thus routing is taking place to for affordable front end route
