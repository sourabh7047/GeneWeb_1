const fetch = require("node-fetch");

function OutSeq(JobId, Result_Type) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.ebi.ac.uk/Tools/services/rest/emboss_backtranseq/result/${JobId}/${Result_Type}`,
      {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "User-Agent": "test",
        },
      }
    )
      .then((res) => res.text())
      .then((sequence) => {
        console.log(sequence);
        resolve(sequence);
      })
      .catch((err) => {
        console.log(error);
        console.log(err);
        reject("ERROR");
      });
  });
}

module.exports = OutSeq;
