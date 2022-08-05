import React, {useEffect, useState} from "react";

function Dbinfo() {

  const [dbData, setDbData] = useState([]);

  useEffect(()=>{
    getData();
  },[]);
  
 

  const getData = () => {
    fetch("/dbinfo")
      .then((response) => {
        return response.json();
      })
      .then((text) => {
        console.log(text);
        setDbData(text);
      });
  };

  for(let i=0;i<dbData.length;i++){
    console.log(dbData[i]+"/");
  }
  
  return <h1>hello</h1>
}

export default Dbinfo;
