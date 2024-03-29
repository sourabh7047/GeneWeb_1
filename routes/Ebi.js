const express = require("express");
var router = express.Router();
const https = require("https");
const xml2js = require("xml2js");
const parseString = xml2js.parseString;
const fetch = require("node-fetch");
const JobStatus = require("./Functions/JobStatus.js");
const OutSeq = require("./Functions/OutSeq.js");
const querystring = require("querystring");

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
          // console.log(body)
          // console.log(result.parameter.values[0].value);
          response.send(result.parameter.values[0].value);
        });
      });
  });
});

router.post(`/:toolname/Rtype/:Rtype/run`, async (request, response) => {
  try {
    const toolName = request.params.toolname;
    console.log(toolName);
    console.log(request.body);
    const out = request.params.Rtype;

    var SequenceData = new URLSearchParams(request.body);

    var JobId = "";

    while (JobId === "" || JobId.endsWith("-p1m")) {
      const res = await fetch(
        `https://www.ebi.ac.uk/Tools/services/rest/${toolName}/run`,
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

      console.log(res.status, "val");
      console.log(res)
      if (res.status >= 200 && res.status <= 299) {
        const textRes = await res.text();
        JobId = textRes;
        console.log(JobId);
      } else {
        console.log(res.status);
        console.log();
        return response.json({
          Response: "Sorry, Unable To Run Your Request Now, Please Try Again",
        });
      }
    }

    if (JobId.endsWith("-p2m")) {
      const StatusResult = await JobStatus(JobId, toolName)
        .then((Status) => {
          console.log("Status :", Status);
          if (Status === "FINISHED") {
            // console.log("got result");
            // const Sequence = OutSeq(JobId, toolName, "aln-clustal_num")  //clutal omega
            // const Sequence = OutSeq(JobId, toolName, "aln-clustalw")   kalign
            // const Sequence = OutSeq(JobId, toolName, "aln-fasta")      muscle
           
            const Sequence = OutSeq(JobId, toolName, out) //out
              .then((res) => {
                console.log("res", res);
                return response.json({ Response: res });
              })
              .catch((err) => {
                return response.status(400).json({
                  Response:
                    "Sequence Could Not Able To Fetch, Please Try Again Later",
                });
              });
          } else if (Status === "NOT FOUND") {
            return response
              .status(400)
              .json({ Response: "Could Not Able To Find The Sequence" });
          } else if (Status === "RUNNING") {
            return response.status(400).json({
              Response: "Sorry, Server Is Taking To Much Time, Try Again",
            });
          } else if (Status === "FAILURE") {
            // console.log("reached here");
            return response.json({
              Response: "Sequence Retrival Process is Failed, try again",
            });
          }
        })
        .catch((err) => {
          return response.status(400).json({ Response: err });
        });
    } else {
      return response.json({
        Response: "Sorry, Unable To Run Your Request Now, Please Try Later",
      });
    }
  } catch (err) {
    response.json({
      Response: "Unable to proceed with your request"
    })
  }
});

module.exports = router;
