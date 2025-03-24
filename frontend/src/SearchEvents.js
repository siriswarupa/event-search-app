

import React, { useState } from "react";

const SearchEvents = () => {
    const [query, setQuery] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [results, setResults] = useState([]);
    const [searchTime, setSearchTime] = useState(null);
    const [logStatus, setLogStatus] = useState("");
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setError(""); // Clear previous errors
        setResults([]); // Clear previous results
        setSearchTime(null);
        setLogStatus("");

        if (!query || !startTime || !endTime) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/search/?query=${query}&start_time=${startTime}&end_time=${endTime}`);

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setResults(data.results || []);
            setSearchTime(data.search_time);
            setLogStatus(data.log_status);
        } catch (error) {
            setError("Error fetching data: " + error.message);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Event Search</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <div>
                <label>Query: </label>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>

                <div>
                <label> Start Time (Epoch): </label>
                <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>

                <div>
                <label> End Time (Epoch): </label>
                <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
                
                <div>
                <button onClick={handleSearch}
                style={{
                    padding: "5px 10px",
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginTop: "10px",
                }}
                >Search</button>
                </div>
                
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>Search Results</h2>
            
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div>
                    <ul>
                    {results.map((event, index) => (
                        <li key={index} >
                            <strong>Source IP:</strong> {event.src_addr}<br></br>
                            <strong>Destination IP:</strong> {event.dst_addr}, <br></br>
                            <strong>Action:</strong> {event.action}<br></br>
                            <strong>Search Time:</strong> {searchTime ? `${searchTime} seconds` : "N/A"}<br></br>
                            <strong>Log Status:</strong> {logStatus}<br></br>
                            <strong>File Name:</strong>{event.file_name}<br></br>
                        </li>
                    ))}
                </ul>
                </div>
                
            )}
        </div>
    );
};

export default SearchEvents;
