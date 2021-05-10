import { useState, useEffect } from "react";
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function Factors(props){

  // initialise state
  const [ factorsData, setFactorsData ] = useState([])    // data to be passed to component
  const [ error, setError ] = useState(null)    // error handler
  const [ loading, setLoading ] = useState(true)  // loading state

  useEffect(() => {
    if((props.country != null) && (props.lastName == [props.country]) && (localStorage.getItem("login") === "1")){
      fetch(`http://131.181.190.87:3000/factors/${props.lastYear}?country=${props.country}`,{
      method: "GET",
      headers: { accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
    .then((res) => res.json())
    .then((res) =>
      res.map((x) => {
        return {
          economy: ['💰',x.economy],
          family: ['👪',x.family],
          health: ['🍎',x.health],
          freedom: ['⚖️',x.freedom],
          generosity: ['🎁',x.generosity],
          trust: ['🧗‍♀️',x.trust]
        }
      }))
    .then((res) => res[0])
    .then((res) => Object.keys(res).map(i => res[i]))
    .then((res) => 
      res.map((x,idx) => {
        return {
          name: x[0],
          data: x[1]
        }
      }))
    .then((res) => setFactorsData(res))
    .catch((error) => {
      setError(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }},[props.country,props.lastName,props.lastYear])
  
  useEffect(() => {
    if((props.year != null) && (localStorage.getItem("login") === "1")){
      fetch(`http://131.181.190.87:3000/factors/${props.year}`,{
        method: "GET",
        headers: { accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`}
      })
      .then((res) => res.json())
      .then((res) => 
        res.map((x) => {
          return{
            country: x.country,
            economy: x.economy,
            family: x.family,
            health: x.health,
            freedom: x.freedom,
            generosity: x.generosity,
            trust: x.trust
          }
        }))
        .then((res) => setFactorsData(res))
        .catch((error) => {
          setError(error)
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
      }
  },[props.year])
  console.log(props.country)
  console.log(props.lastYear)
  console.log(props.lastName)
  if(error){
    return(
      <div className="factors">
        <div className="factorsmessage">
          <h3>😟An Error Occured</h3>
        </div>
      </div>
    )
  }
  else if(localStorage.getItem("login") === "0"){
    return(
      <div className="factors">
        <div className="factorsmessage">
          <h3>🔒Locked Content</h3>
        </div>
      </div>
    )
  }
  else if(!loading && props.year != null){
      return(
        <div className="factors2">
          <h2>{props.year} No.1 by Factors🥇</h2>
        <div className="factorsl2">
          <h3>💰Economy</h3>
          <h5>{factorsData.sort((a,b) => (a.economy < b.economy ? 1: -1))[0].country}</h5>
          <h3>👪Family</h3> 
          <h5>{factorsData.sort((a,b) => (a.family < b.family ? 1: -1))[0].country}</h5>
          <h3>🍎Health</h3>
          <h5>{factorsData.sort((a,b) => (a.health < b.health ? 1: -1))[0].country}</h5>
        </div>
        <div className="factorsr2">
          <h3>⚖️Freedom</h3>
          <h5>{factorsData.sort((a,b) => (a.freedom < b.freedom ? 1: -1))[0].country}</h5>
          <h3>🎁Generosity</h3>
          <h5>{factorsData.sort((a,b) => (a.generosity < b.generosity ? 1: -1))[0].country}</h5>
          <h3>🧗‍♀️Trust</h3>
          <h5>{factorsData.sort((a,b) => (a.trust < b.trust ? 1: -1))[0].country}</h5>
        </div>
      </div>
      )
    }
    else if(!loading && props.country != null && props.lastAvailable !== 0){
      return(
        <div>
        <div className="barcharttitle">
          <p>{props.country} Factors</p>
        </div>
        <div className="barchart">
        <BarChart width={430} height={330} data={factorsData}>
          <Bar dataKey="data" fill="#1E90FF" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip/>
        </BarChart>
        <CartesianGrid/>
        </div>
        </div>
      )
    }
  else {
    return(
      <div className="factors">
        <div className="factorsmessage">
          <h3>💬Select an Option</h3>
        </div>
      </div>
    )
  }
}
