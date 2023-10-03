import React, { useState } from "react";
import axios from "axios";

function PowerSeries() {
  const [number, setNumber] = useState("");
  const [series, setSeries] = useState([]);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    list: {
      listStyleType: "none",
      padding: 0,
    },
    listItem: {
      padding: "5px",
      backgroundColor: "#f7f7f7",
      margin: "5px 0",
      borderRadius: "4px",
    },
  };

  const handleSubmit = () => {
    if (number >= 1 && number <= 10) {
      axios.post("http://localhost:5000/api/number", { number }).then((res) => {
        setSeries(res.data.series);
      });
    }
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        type="number"
        min="1"
        max="10"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
      <ul style={styles.list}>
        {series.map((item, index) => (
          <li key={index} style={styles.listItem}>
            Power {item.power}: {item.power_value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PowerSeries;
