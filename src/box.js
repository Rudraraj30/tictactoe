import React from "react";
import "./box.css";
function box(props) {
  const classOfCell=props.current.value.length ? "cell":"fill" 
  console.log(classOfCell)
  return (

      <div className="mainb">
      
      <button className={classOfCell} onClick={()=>props.toggle(props.current.id,props.move)}>{props.current.value}</button>
      </div>
  );
}
export default box;
