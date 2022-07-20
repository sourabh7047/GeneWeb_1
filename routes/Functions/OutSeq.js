import fetch from "node-fetch";


export default function OutSeq(JobId, toolName, Result_Type) {
  console.log(toolName);
  // if (Result_Type === "aln-clustal_num") {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.ebi.ac.uk/Tools/services/rest/${toolName}/result/${JobId}/${Result_Type}`,
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
  // } else {
  // return new Promise((resolve, reject) => {
  // fetch(
  //   `https://www.ebi.ac.uk/Tools/services/rest/${toolName}/result/${JobId}/${Result_Type}`
  // ).then((response) => {
  //   response.blob().then((blobResponse) => {
  //     console.log(blobResponse[Symbol(type)]);
  //     // fetch(`http://localhost:3000/lost`, {
  //     //   method: "post",
  //     //   body: blobResponse,
  //     // });
  //     resolve(blobResponse);
  //   });
  // });

  // https.get(
  //   `https://www.ebi.ac.uk/Tools/services/rest/${toolName}/result/${JobId}/${Result_Type}`,
  //   { "Accept-Charset": "utf-8", encoding: null },
  //   (res) => {
  //     console.log("statusCode:", res.statusCode);
  //     console.log("headers:", res.headers);

  //     var Cdata = "";
  //     res
  //       .on("data", (chunk) => {
  //         Cdata += chunk;
  //       })
  //       .on("end", () => {
  //         console.log(Cdata);
  //         resolve(Cdata);
  //       });
  //   }
  // );
  // });
  // }
}

