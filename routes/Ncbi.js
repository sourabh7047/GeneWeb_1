var express = require("express");
const { route } = require("express/lib/application");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const dir = __dirname;
const https = require("https");
const parseString = require("xml2js").parseString;
const Espell = require("../Espell");
const SumData = require("../SummaryData");

const base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";

var webEnv = "";
var queryKey = "";
var retstart = 0;
let length = 0;

router.get("/", async (req, res) => {
  try {
    res.send("You are hitting the NCBI endpoint");
  } catch (err) {
    res.send(500).send("Internal Server Error");
  }
});

router.get("/dbinfo", (request, response) => {
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

router.post("/dbinfoData", (request, response) => {
  console.log("initial query received");
  var DBdata = request.body.DBdata;
  var Queryterm = request.body.QueryTerm;
  var newQuery = request.body.QueryTerm;

  https.get(base + "espell.fcgi?db=" + DBdata + "&term=" + Queryterm, (res) => {
    let body = "";
    res
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

router.get(
  "/:dbdata/webenv/:webenv/query/:query/page/:page",
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

router.post("/:dbdata/download/:id", (request, response) => {
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

module.exports = router;
