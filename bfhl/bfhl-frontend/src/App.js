import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const validJson = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:3000/bfhl", validJson);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or error from backend");
    }
  };

  const handleFilterChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedFilters(selected);
  };

  const renderResults = () => {
    if (!response) return null;
    const result = {};
    if (selectedFilters.includes("Alphabets")) {
      result.alphabets = response.alphabets;
    }
    if (selectedFilters.includes("Numbers")) {
      result.numbers = response.numbers;
    }
    if (selectedFilters.includes("Highest Alphabet")) {
      result.highest_alphabet = response.highest_alphabet;
    }
    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>ABCD123</h1> {RA2111003020074}
      <form onSubmit={handleSubmit}>
        <label>
          JSON Input:
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <label>
        Filter Response:
        <select
          multiple={true}
          value={selectedFilters}
          onChange={handleFilterChange}
        >
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest Alphabet">Highest Alphabet</option>
        </select>
      </label>
      <div>{renderResults()}</div>
    </div>
  );
}

export default App;
