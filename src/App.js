/* import logo from "./logo.svg"; */
import "./App.css";
import React, { useState, useEffect } from "react";
/* import { act } from "react-dom/test-utils"; */

function App() {
  const [numberInSpace, setNumberInSpace] = useState(0);
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [activeCraft, setActiveCraft] = useState("All");

  useEffect(() => {
    async function fetchPeopleInSpace() {
      const response = await fetch(`http://api.open-notify.org/astros.json`);
      const data = await response.json();

      setNumberInSpace(data.number);
      setPeopleInSpace(data.people);
    }

    fetchPeopleInSpace();
  }, []);
  const filteredPeople =
    activeCraft === "All"
      ? peopleInSpace
      : peopleInSpace.filter((person) => person.craft === activeCraft);

  return (
    <main>
      {filteredPeople.length > 0 && (
        <ul>
          {filteredPeople.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}

      <h2>Craft: {activeCraft}</h2>
      <button type="button" onClick={() => setActiveCraft("All")}>
        All
      </button>

      <button type="button" onClick={() => setActiveCraft("ISS")}>
        ISS
      </button>
      <button type="button" onClick={() => setActiveCraft("Tiangong")}>
        Tiangong
      </button>
    </main>
  );
}

export default App;
