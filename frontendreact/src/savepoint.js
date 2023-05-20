import React, { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file

function Appss() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/companies/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setCompanies(data.map((company) => ({ ...company, employees: [], loaded: false })));
      })
      .catch((error) => console.log("API Error:", error));
  }, []);

  const fetchEmployees = (companyId) => {
    fetch(`http://127.0.0.1:8000/api/v1/companies/${companyId}/employees/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Employees Response:", data);
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company.id === companyId ? { ...company, employees: data, loaded: true } : company
          )
        );
      })
      .catch((error) => console.log("Employees Error:", error));
  };

  return (
    <div className="app-container">
      {companies.map((company) => (
        <div className="company-container" key={company.id}>
          <h2>{company.name}</h2>
          <button onClick={() => fetchEmployees(company.id)}>
            Load Employees
          </button>
          {company.loaded && company.employees.length > 0 ? (
            <ol>
              {company.employees.map((employee) => (
                <li className="employee-item" key={employee.id}>
                  <strong>Name:</strong> {employee.name}<br />
                  <strong>Position:</strong> {employee.position}<br />
                  <strong>Address:</strong> {employee.address}<br />
                </li>
              ))}
            </ol>
          ) : (
            <p>{company.loaded ? "No employees" : ""}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Appss;
