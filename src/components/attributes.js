import React from 'react'
import "./attributes.css"
export default function Attributes(props) {

const colors=["#3DB2FF","#F0D9FF","#FF6B6B","#9B72AA","#28FFBF"]    


// rendering dimensions and assigning different background colors through colorindex variable

function renderDimensions(){
    var colorindex=-1;
return(
    <div>
        {props.dimensions.map((eachDimension)=>{
            colorindex++
         return(
             <div className="dimension_container">
             <label style={{backgroundColor:colors[colorindex]}} className="dimension">{eachDimension.name.toUpperCase()}</label>
             <p style={{backgroundColor:colors[colorindex]}} className="dimension">{eachDimension.value}</p>
             </div>
         )
        })}
    </div>
)
}

    return (
        <div className="attribute_container">
        <div  className="dimension_container">
        <label  style={{backgroundColor:colors[4]}} className="dimension" >{"Measure".toUpperCase()}</label>
            <p style={{backgroundColor:colors[4]}} className="dimension" >{props.measure}</p>
        </div>
           
            {props.dimensions!==undefined?renderDimensions():null}
        </div>
    )
}
