
import React, { useEffect, useState } from "react";

import Graph from './components/graph';
import axios from "axios"
import Pagination from "./components/pagination"
import Attributes from "./components/attributes";

function App() {

  const [graphID,setgraphID]=useState("60508885da4c96019c357c19_e1c87eb652bb574c1514fe4bb73836b4")
  const [data,setdata]=useState(null)
  const [currentmeasure,setcurrentmeasure]=useState()
  const [currentdimensions,setcurrentdimensions]=useState()
  const [loading,setloading]=useState(false)

//fetching data based on graph id which is being passed through prop drilling from pagination.js
  
  useEffect(()=>{
  axios.get(`https://graphvisualization.herokuapp.com/graphoperations/getData/${graphID}`)
  .then((res)=>{
    
      setdata(res.data.data)
      setloading(false)
  })
  },[graphID])


  return (
    <div>
    <div style={{display:"flex"}}>
    <Graph data={data} graphID={graphID}/>
<Attributes measure={currentmeasure} dimensions={currentdimensions}/>
    </div>

<Pagination setloading={setloading} setmeasures={setcurrentmeasure} setgraphID={setgraphID} setdimensions={setcurrentdimensions}/>
{loading?<div style={{position:"relative",left:"1050px",bottom:"95px"}}>

  <iframe src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40" width="150" height="150" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>:null}
    </div>
  );
}

export default App;
