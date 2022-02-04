import React, {useState, useEffect} from "react";
import SummaryCard from "./SummaryCard";
import FileFormat from './FileFormat';

function SummaryList(props) {
  const [Format, setFormat] = useState([]);

    useEffect(() => {
      console.log(FileFormat.databaseList)
      FileFormat.databaseList.forEach(database=>{
        console.log(FileFormat.databaseList[database]);
        if(database=== props.dataConstruct.dbdata){
          setFormat(FileFormat.databaseData[database].datalist);
        }
    })
  
    for(let i=0; i<Format.length; i++){
      console.log(Format[i]);
    }
     
    }, []);
 


  return (
    <ul>
      {props.summaryItemList.map((summary, index) => {
        return (
          <SummaryCard
            key={summary.UniqeKey}
            title={summary.Title}
            FirstField={summary.UniqeKey}
            SecondField={summary.NumData}
            ThirdField={summary.VarientOne}
            FourthField={summary.VarientSecond}
            dataConstruct = {props.dataConstruct}
            Format={Format}
          />
        );
      })}
    </ul>
  );
}

export default SummaryList;
