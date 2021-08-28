
import {Area,Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend,ComposedChart} from 'recharts';

import "./graph.css"

export default function Graph(props){


// returns legend keys used in the graph

function renderLegend(){
  return(
    <ul style={{display:"flex"}}>

      <li className="legend_para" style={{color:"#363558"}}>Original Value</li>
      <li className="legend_para" style={{color:"#8884d8"}}>Forecasted value</li>
      <li className="legend_para" style={{color:"#dddddd"}} >Max Band</li>
      <li className="legend_para" style={{color:"#dddddd"}} >Min Band</li>
      <li className="legend_para" style={{color:"red"}} >Anamaly</li>
    </ul>
  )
}


   

return(
<div>

{/* // ComposedChart is used to draw multiple type of chart inside a single cartesian plane */}

{props.data!==null?<ComposedChart width={1200} height={600} data={props.data}
  margin={{ top: 30, right: 30, left: 20, bottom: 5 }} >
 
  <CartesianGrid strokeDasharray="1 1" />


 <XAxis dataKey="timestamp" label={{ value: 'Time',position: 'centerBottom' }} />
   <YAxis datakey="original_value"  label={{ value: 'Values', angle: -90, position: 'insideLeft' }}/>
  <Tooltip />
  


  <Legend content={renderLegend} verticalAlign="top" height={36}/>
 
{/* //Line is used to draw line graphs   */}
  <Line  dataKey="original_value" stroke="#363558" dot={false} />

  <Line dataKey="max_band" stroke="#dddddd" dot={false} />
  <Line dataKey="min_band" stroke="#dddddd" dot={false} />
  <Line  dataKey="forecasted_value" stroke="#8884d8"  strokeDasharray="5 5"  dot={false}/>


{/* // rendering anomaly in the data based on line status */}

  <Line  dataKey={(each)=>{
      if(each.line_status===1 || each.line_status===2){
          return each.original_value
      }
  }} stroke="red" dot={false} />

{/* // Area is used to draw area graph of particular points, but here its been used to render area between two points max_band and min_band */}
   <Area dataKey={(each)=>{
       return [each.max_band,each.min_band]
   }} 
   fill="#dddddd" stroke="white"

   />
 
</ComposedChart>:null}




</div>
)

}