import React, { useState, useEffect } from "react";

function App(){
const [Companies, setcompanies] = useState([]);

  
useEffect( () => { 
    fetch("www.ggolr.com")
    .then( (response) => { response.json() } )
    .then((data) => {

          setcompanies(data.map((company)=> ({...company,employee:[], loaded:false} )  ) ); // new peoperty added empty array of employee and loaded which is set to false

        })

        .catch((e) => console.log("api response:", e));
           
        } ) ;

        

}
