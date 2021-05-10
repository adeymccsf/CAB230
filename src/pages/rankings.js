import { React, useState, useEffect } from "react"
import { Factors } from "../components/factors"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-theme-balham.css"
import "ag-grid-community/dist/styles/ag-grid.css"

export function Rankings(){

    // initialise state
    const [query, setQuery] = useState(null)    // set search year
    const [rowData, setRowData] = useState([])    // set grid data
    
    // define grid columns
    const columns = [
      { headerName: "Rank 🏆", field: "rank", sortable: true },
      { headerName: "Country 🌏", field: "country", filter: true },
      { headerName: "Score 📈", field: "score" }
    ];

    // hook to get data 
    useEffect(() => {
        if(query != null){
      fetch(`http://131.181.190.87:3000/rankings?year=${query}`)
      .then((res) => res.json())
      .then((res) => 
        res.map((x) => {
          return {
            rank: x.rank,
            country: x.country,
            score: x.score
          };
        })
      )
        .then((rankings) => setRowData(rankings));
    } }, [query]);
  
    return (
      <div className="page">
      <div className="Info">
        <span>📌 Tabulated data of country rankings & scores from the World Happiness Report</span>
      </div>
        <div className="search">
            <button onClick={() => setQuery(2015)}>2015</button>
            <button onClick={() => setQuery(2016)}>2016</button>
            <button onClick={() => setQuery(2017)}>2017</button>
            <button onClick={() => setQuery(2018)}>2018</button>
            <button onClick={() => setQuery(2019)}>2019</button>
            <button onClick={() => setQuery(2020)}>2020</button>
        </div>
        <div className="content">
          <div className="ag-theme-balham"
            style={{
                height: "350px",
                width: "620px"
            }}
            >
            <AgGridReact
              columnDefs={columns}
              rowData={rowData}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
          <Factors year={query}/>
        </div>
      </div>
    )
  }