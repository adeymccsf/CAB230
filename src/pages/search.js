import { useState, useEffect } from "react"
import { Factors } from "../components/factors"
import { Typeahead } from 'react-bootstrap-typeahead'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export function Search(){
  
  // initialise state
  const [ countryList, setCountryList ] =useState([])   // set autosuggested countries
  const [ searchTerm, setSearchTerm ] = useState(null)    // set what the user has typed
  const [ selectedCountry, setSelectedCountry ] = useState(null)    // set the selected option
  const [ graphData, setGraphData ] = useState([{year:0,score:0}])    // set graphed data

  // hook to get country names
  useEffect(() => {
    fetch(`http://131.181.190.87:3000/countries`)
    .then((res) => res.json())
    .then((res) =>
      setCountryList(res))
    },[])

  // hook to get graph data
  useEffect(() => {
    if (selectedCountry != null){
      return(
        fetch(`http://131.181.190.87:3000/rankings?country=${selectedCountry}`)
        .then((res) => res.json())
        .then((res) => res.reverse())
        .then((res) => 
          res.map((x) => {
            return{
              country: x.country,
              year: x.year,
              score: x.score
            }
          })
      )
      .then((scores) => setGraphData(scores))
      )
    }},[selectedCountry])

    return(
      <div className="page">
      <div className="Info">
        <span>📌 Graphical data of historical country scores from the World Happiness Report</span>
      </div>
        <div className="search2">
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            onChange={setSearchTerm}
            options={countryList}
            placeholder="Search for a country..."
            selected={searchTerm}
          />
          <button onClick={() => setSelectedCountry(searchTerm)}>🔎</button>
          </div>
        <div className="content2">
          <div className="NameDisplay">
              <p>{selectedCountry} Historical Scores</p>
            </div>
          <div className="Graph">
            <LineChart width={610} height={370} data={graphData}
            margin={{top:40,right:50,bottom:10}}>          
              <Line name="Score" type="monotone" dataKey="score" stroke="#1E90FF" strokewidth={20} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
              <XAxis dataKey="year" />
              <YAxis domain={[0,8]}/>
              <Tooltip />
            </LineChart>
          </div>
          <Factors 
          lastName={graphData[graphData.length-1].country} 
          lastYear={graphData[graphData.length-1].year.toString()} 
          country={selectedCountry} />
        </div>
      </div>
  ) 
}