import React, { useState, useEffect } from "react";
import axios from "axios";
import { states } from "./helpers";
import "./index.css";

const Stats = () => {
  const [stateFrom, setStateFrom] = useState("");
  const [stateTo, setStateTo] = useState("");
  const [stats, setStats] = useState({ avg_time: "", count: 0 });
  const [destinationStats, setDestinationStats] = useState({
    avg_time: "",
    count: 0,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5050/api/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const getAvgDestinationTime = () => {
    axios
      .post("http://127.0.0.1:5050/api/stats/destination", {
        from: `,${stateFrom},US`,
        to: `,${stateTo},US`,
      })
      .then((response) => {
        setDestinationStats(response.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <div className="sats_container">
      <p>Stats</p>

      <div className="section">
        <h2>Total Amount of orders</h2>
        <p>{stats.count || "-"}</p>
      </div>
      <div className="section">
        <h2>Average time per delivery</h2>
        <p>{stats.avg_time || "-"}</p>
      </div>

      <div className="section">
        <h2>Stats for average time from country to country</h2>
        <p>From</p>
        <select
          name="cars"
          id="cars"
          onClick={(e) => {
            setStateFrom(e.target.value);
          }}
          defaultValue=""
        >
          <option value={""}>{""}</option>
          {states.map((state) => {
            return <option value={state.code}>{state.name}</option>;
          })}
        </select>
        <p>To</p>
        <select
          name="cars"
          id="cars"
          onClick={(e) => {
            setStateTo(e.target.value);
          }}
          defaultValue=""
        >
          <option value={""}>{""}</option>
          {states.map((state) => {
            return <option value={state.code}>{state.name}</option>;
          })}
        </select>
        <br />
        <br />
        <br />

        <button
          disabled={!stateFrom || !stateTo}
          onClick={getAvgDestinationTime}
        >
          Check
        </button>

        <br />
        <br />
        <br />
        {!destinationStats.count && !destinationStats.avg_time ? (
          <p>No data</p>
        ) : (
          <>
            <p>Count: {destinationStats.count || "-"}</p>
            <p>Avg time: {destinationStats.avg_time || "-"}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Stats;
