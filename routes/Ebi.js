var express = require("express");
var router = express.Router();
const https = require("https");
const parseString = require("xml2js").parseString;
const fetch = require("node-fetch");
const JobStatus = require("./Functions/JobStatus");
const OutSeq = require("./Functions/OutSeq");

const EBIBase = "https://www.ebi.ac.uk/Tools/services/rest";

router.get("/parameterDetail/:toolname/:parameter", (request, response) => {
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
          // console.log(result.parameter.values[0].value);
          response.send(result.parameter.values[0].value);
        });
      });
  });
});

router.post(`/:toolname/run`, async (request, response) => {
  var toolName = request.params.toolname;

  var SequenceData = new URLSearchParams(request.body).toString();

  var JobId = "";

  while (JobId === "" || JobId.endsWith("-p1m")) {
    const res = await fetch(
      "https://www.ebi.ac.uk/Tools/services/rest/emboss_backtranseq/run",
      {
        method: "post",
        body: SequenceData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/plain",
          "User-Agent": "test",
        },
      }
    );

    if (res.status >= 200 && res.status <= 299) {
      const textRes = await res.text();
      JobId = textRes;
      // console.log(JobId);
    } else {
      response.json({
        Response: "Sorry, Unable To Run Your Request Now, Please Try Again",
      });
      break;
    }
  }

  if (JobId.endsWith("-p2m")) {
    const StatusResult = JobStatus(JobId)
      .then((Status) => {
        if (Status === "FINISHED") {
          // console.log("got result");
          const Sequence = OutSeq(JobId, "out")
            .then((res) => {
              response.json({ Response: res });
            })
            .catch((err) => {
              response.status(400).json({
                Response:
                  "Sequence Could Not Able To Fetch, Please Try Again Later",
              });
            });
        } else if (Status === "NOT FOUND") {
          res
            .status(400)
            .json({ Response: "Could Not Able To Find The Sequence" });
        } else if (Status === "RUNNING") {
          res.status(400).json({
            Response: "Sorry, Server Is Taking To Much Time, Try Again",
          });
        }
      })
      .catch((err) => {
        response.status(400).json({ Response: err });
      });
  } else {
    response.json({
      Response: "Sorry, Unable To Run Your Request Now, Please Try Later",
    });
  }
});

module.exports = router;
