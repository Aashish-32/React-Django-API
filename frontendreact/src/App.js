import React, { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file
import ReactDOM from "react-dom";




function App()  {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("https://aashish32.pythonanywhere.com/api/v1/companies/")
      .then((response) => response.json()) //.then(response => response.json()) . when there is 1 argument no need for "()".
     
      .then((data) => {
        //console.log("API Response:", data);
        setCompanies(data.map((company) => ({ ...company, employees: [], loaded: false })));
      })
      //.catch((error) => console.log("API Error:", error));
  },[]); // last [] represents the dependencies if useEffect i.e. when it is excuted. if empty it executes on once

  const fetchEmployees = (companyId) => {
    fetch(`https://aashish32.pythonanywhere.com/api/v1/companies/${companyId}/employees/`)
      .then((respons) => respons.json())
      .then((data) => {
        //console.log("Employees Response:", data);
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company.id === companyId ? { ...company, employees: data, loaded: true } : company
          )
        );
      })
      //.catch((error) => console.log("Employees Error:", error));
  };

  const showAdditionalInfo = (companyId, employeeId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          const updatedEmployees = company.employees.map((employee) => {
            if (employee.id === employeeId) {
              return { ...employee, showInfo: !employee.showInfo };
            }
            return employee;
          });
          return { ...company, employees: updatedEmployees };
        }
        return company;
      })
    );
  };

  return (
    <div>

    
    <div className="app-container">
      <h1>Company Directory</h1>
      < div className="companies">
      {companies.map((company) => (
        <div className="company-container" key={company.id}>
          <h2>{company.name}</h2>
          <button onClick={() => fetchEmployees(company.id)}>Load Employees</button>
          {company.loaded && company.employees.length > 0 ? (
            <ul>
              {company.employees.map((employee) => (
                <li className="employee-item" key={employee.id}>
                  <strong>Name:</strong> {employee.name}<br />
                  <strong>Position:</strong> {employee.position}<br />
                  <strong>Address:</strong> {employee.address}<br />
                  <button onClick={() => showAdditionalInfo(company.id, employee.id)}>
                    {employee.showInfo ? "Hide Additional Info" : "Show Additional Info"}
                  </button>

                
                  {employee.showInfo && (
                    <div>
                      <br></br>
                      <strong>Phone:</strong> {employee.phone_number}<br />
                      <strong>Email:</strong> {employee.email}<br />
                      <hr></hr>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>{company.loaded ? "No employees" : ""}</p>
          )}
        </div>
      ))}
    </div>
    </div>
    </div>
  );
}

export default App;
