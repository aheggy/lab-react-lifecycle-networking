import { useState, useEffect } from "react";

import PetList from "./PetList";
import "./Employee.css";



export const Employee = ({employee}) => {
  const [showPets, setShowPets] = useState(false)
  const [pets, setPets] = useState([])

  useEffect(()=> {
    fetch(`https://resource-veterinarian-api.fly.dev/api/pets?employeeId=${employee.id}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      setPets(response)
    })
    .catch((error) => console.error(error))
  }, [])

  const toggleShowPets = () => {
    setShowPets(!showPets)
  }
  
  let employeeName = `${employee.prefix ? `${employee.prefix} ` : ""}${employee.firstName} ${employee.lastName}${employee.postfix ? `, ${employee.postfix}` : ""}`;

  return (
    <article className="employee">
      <h3>{employeeName}</h3>
      <h4>{employee.title}</h4>
      <button onClick={toggleShowPets}>{showPets ? "Hide Pets" : "Show Pets"}</button>
      {showPets ? <PetList pets={pets}/> : <></>}
    </article>
  );
};

export default Employee;
