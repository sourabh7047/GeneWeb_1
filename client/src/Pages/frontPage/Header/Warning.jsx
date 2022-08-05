import "./Warning.css";

export default function warning(props){
  console.log(props.Dbname);  
  return (
      
        <div className="warning">
          <p>DataBase can not be null</p>
          <button className="btn" onClick={props.removeWarning}>
            Confirm
          </button>
        </div>
      );
}