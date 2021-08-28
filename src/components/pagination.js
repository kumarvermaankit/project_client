import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "./pagination.css"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
export default function Pagination(props) {
   
    const [currentactive,setcurrentactive]=useState()
    const [metrics,setmetrics]=useState(null)
    const [currentpaginationlimit,setcurrentpaginationlimit]=useState(7)
    var pageNumber=0;


    // Fetching value from mongoDB through api call and storing initial values
    useEffect(()=>{
      
      
        
        
        axios.get("https://graphvisualization.herokuapp.com/graphoperations/getmetrics")
        .then((res)=>{
         
          
        setmetrics(res.data)
       
        props.setmeasures(res.data[0].measure)    
        props.setdimensions(res.data[0].dimensions)
        setcurrentactive(res.data[0].id)
        props.setgraphID(res.data[0].id)
        })
        
        },[])



// changes the current active element to the element just clicked 
// also updates measures and dimensions
// also update graph id and loading state

    function paginationUpdate(id,measure,dimensions){
        props.setgraphID(id)
        props.setloading(true)
        document.getElementById(currentactive).classList.remove("active")
        document.getElementById(id).classList.add("active")
        setcurrentactive(id)
        props.setmeasures(measure)
        props.setdimensions(dimensions)
    }

//function to render paginationButtons dynamically based on currentpaginationlimit variable 

function renderPaginationButtons(){
    
    return(
        <div style={{display:"flex"}}>
            {metrics.map((metrice)=>{
              
                var invisible=false
                if(pageNumber>currentpaginationlimit){
                    invisible=true
                }
                pageNumber++
                if(pageNumber<=currentpaginationlimit-7 && currentpaginationlimit!==7){
                  invisible=true
              }
                return(
                    <div>
                    <button style={{display:invisible?"none":"block"}} className={pageNumber===1?"active pagination_buttons":"pagination_buttons"} key={metrice.id} id={metrice.id} onClick={()=>paginationUpdate(metrice.id,metrice.measure,metrice.dimensions)}>{pageNumber}</button>
                    </div>
                )
            })}
        </div>
    )
}



    return (
        <div className="pagination">
            {metrics!==null?<div style={{display:"flex"}}>


{/* Fast forward button forward to next row of elements similary Fast rewind works */}
{/* Forward button forward the elements by 1 similarly backward works */}

                <button className="pagination_buttons navigationbtn" disabled={currentpaginationlimit<=7?true:false}  onClick={()=>{setcurrentpaginationlimit(currentpaginationlimit-7<=7?7:(currentpaginationlimit-7))}} ><FastRewindIcon style={{fontSize:"14px"}} /></button>
                <button className="pagination_buttons navigationbtn" disabled={currentpaginationlimit<=7?true:false} onClick={()=>{setcurrentpaginationlimit(currentpaginationlimit-1)}} ><ChevronLeftIcon style={{fontSize:"14px"}}/></button>
                {renderPaginationButtons()}
                <button className="pagination_buttons navigationbtn" disabled={currentpaginationlimit>metrics.length-2?true:false} onClick={()=>{setcurrentpaginationlimit(currentpaginationlimit+1)}}><ChevronRightIcon style={{fontSize:"14px"}} /></button>
                <button className="pagination_buttons navigationbtn" disabled={currentpaginationlimit>metrics.length-2?true:false} onClick={()=>(setcurrentpaginationlimit(24-currentpaginationlimit>7?currentpaginationlimit+7:23))}><FastForwardIcon style={{fontSize:"14px"}} /></button>
            </div>
            :null}
        </div>
    )
}
