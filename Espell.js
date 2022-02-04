import { parseString } from "xml2js";

export default function Espell(body, Queryterm){
    let NewQueryterm = ""; 
    parseString(body, function (err, result) {
      let termCount = 0;
      console.log(result.eSpellResult.CorrectedQuery);
      result.eSpellResult.CorrectedQuery.map(ele=>{
        NewQueryterm += ele;
        termCount += 1;
        if(result.eSpellResult.CorrectedQuery.length !== 1 && termCount !== result.eSpellResult.CorrectedQuery.length){
          NewQueryterm += " ";
        }
      });
      if(NewQueryterm !== "" && Queryterm !== NewQueryterm ){
        Queryterm = NewQueryterm;
      }
    });

    return Queryterm;
}