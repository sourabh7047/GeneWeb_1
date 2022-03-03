// jshint esversion:6
const express = require("express");
const colors = require("colors");
const cors = require("cors");

const app = express();

// -----------------------------base site

// const base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
const EBIBase = "https://www.ebi.ac.uk/Tools/services/rest";

// -----------------------------variables;

// ----------------------------middleware
app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.SERVER_PORT;
// ----------------------------get requests

// app.get(
//   "/toolname/parameterDetail/:toolname/:parameter",
//   (request, response) => {
//     let toolname = request.params.toolname;
//     let parameter = request.params.parameter;

//     https.get(`${EBIBase}/${toolname}/parameterdetails/${parameter}`, (res) => {
//       let body = "";
//       res
//         .on("data", (chunk) => {
//           body += chunk;
//         })
//         .on("end", () => {
//           parseString(body, function (err, result) {
//             // console.log(result.parameter.values[0].value);
//             response.send(result.parameter.values[0].value);
//           });
//         });
//     });
//   }
// );

// app.post(`/toolname/:toolname/run`, async (request, response) => {
//   var toolName = request.params.toolname;

//   var SequenceData = new URLSearchParams(request.body).toString();

//   var JobId = "";

//   while (JobId === "" || JobId.endsWith("-p1m")) {
//     const res = await fetch(
//       "https://www.ebi.ac.uk/Tools/services/rest/emboss_backtranseq/run",
//       {
//         method: "post",
//         body: SequenceData,
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Accept: "text/plain",
//           "User-Agent": "test",
//         },
//       }
//     );

//     if (res.status >= 200 && res.status <= 299) {
//       const textRes = await res.text();
//       JobId = textRes;
//       // console.log(JobId);
//     } else {
//       response.json({
//         Response: "Sorry, Unable To Run Your Request Now, Please Try Again",
//       });
//       break;
//     }
//   }

//   if (JobId.endsWith("-p2m")) {
//     const StatusResult = JobStatus(JobId)
//       .then((Status) => {
//         if (Status === "FINISHED") {
//           // console.log("got result");
//           const Sequence = OutSeq(JobId, "out")
//             .then((res) => {
//               res.send({ Response: res });
//               // console.log("got the sequence");
//             })
//             .catch((err) => {
//               res.status(400).json({
//                 Response:
//                   "Sequence Could Not Able To Fetch, Please Try Again Later",
//               });
//             });
//         } else if (Status === "NOT FOUND") {
//           res
//             .status(400)
//             .json({ Response: "Could Not Able To Find The Sequence" });
//         } else if (Status === "RUNNING") {
//           res.status(400).json({
//             Response: "Sorry, Server Is Taking To Much Time, Try Again",
//           });
//         }
//       })
//       .catch((err) => {
//         res.status(400).json({ Response: err });
//       });
//   } else {
//     response.json({
//       Response: "Sorry, Unable To Run Your Request Now, Please Try Later",
//     });
//   }
// });

app.use("/internal", require("./routes/Ncbi"));
app.use("/toolname", require("./routes/Ebi"));

// ---------------------------listen requests
app.listen(5000, function () {
  console.log(`server has started on port ${PORT}`.yellow.bold);
});

// whenever we get the localhost:300 meaning that something wrong you have done in the frontend request send thus routing is taking place to for affordable front end route
