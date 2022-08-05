import fetch from "node-fetch";

export default function JobStatus(JobId, toolName) {
  var ResultAwaitOptions = {
    Method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/plain",
      "User-Agent": "test",
    },
  };

  var counter = 0;
  return new Promise((resolve, reject) => {
    const Progress = setInterval((counter) => {
      // console.log("t");
      fetch(
        `https://www.ebi.ac.uk/Tools/services/rest/${toolName}/status/${JobId}`,
        ResultAwaitOptions
      )
        .then((res) => res.text())
        .then((body) => {
          console.log("body", body)
          if (body === "FINISHED") {
            console.log(body + "/");
            clearInterval(Progress);
            // console.log("done")
            resolve(body); //resolve
          } else if (body === "NOT FOUND") {
            console.log(body + "//");
            clearInterval(Progress);
            resolve(body); //resolve
          } else if (body === "RUNNING") {
            counter += 1;
            if (counter == 25) {
              clearInterval(Progress);
              resolve("RUNNING"); //resolve
            }
          } else {
            console.log(body);
            clearInterval(Progress);
            resolve(body);
          }
        })
        .catch((err) => {
          //   console.log("catch error");
          clearInterval(Progress);
          reject("Internal Server Error, Try after some time!");
        });
    }, 5000);
  });
}