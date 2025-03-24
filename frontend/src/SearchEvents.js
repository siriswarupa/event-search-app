// // // // import React, { useState } from "react";

// // // // const SearchEvents = () => {
// // // //     // State variables for search inputs
// // // //     const [query, setQuery] = useState("");
// // // //     const [startTime, setStartTime] = useState("");
// // // //     const [endTime, setEndTime] = useState("");
// // // //     const [results, setResults] = useState([]);
// // // //     const [loading, setLoading] = useState(false);
// // // //     const [error, setError] = useState(null);

// // // //     // Handle form submission
// // // //     const handleSearch = async (e) => {
// // // //         e.preventDefault();
// // // //         setLoading(true);
// // // //         setError(null);
// // // //         setResults([]);

// // // //         try {
// // // //             // Replace with your actual backend URL
// // // //             const API_URL = `http://127.0.0.1:8000/api/search/?search_string=${query}&start_time=${startTime}&end_time=${endTime}`;

// // // //             // Make API request using fetch
// // // //             const response = await fetch(API_URL, {
// // // //                 method: "GET",
// // // //                 headers: {
// // // //                     "Content-Type": "application/json",
// // // //                 },
// // // //             });

// // // //             if (!response.ok) {
// // // //                 throw new Error("Failed to fetch data.");
// // // //             }

// // // //             const data = await response.json();
// // // //             setResults(data.results); // Assuming backend returns { results: [...] }
// // // //         } catch (err) {
// // // //             setError("Failed to fetch data. Please try again.");
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div style={{ padding: "20px", fontFamily: "Arial" }}>
// // // //             <h2>Event Search</h2>

// // // //             {/* Search Form */}
// // // //             <form onSubmit={handleSearch}>
// // // //                 <label>
// // // //                     Query:
// // // //                     <input
// // // //                         type="text"
// // // //                         value={query}
// // // //                         onChange={(e) => setQuery(e.target.value)}
// // // //                         placeholder="Enter IP or field"
// // // //                         required
// // // //                     />
// // // //                 </label>
// // // //                 <br />

// // // //                 <label>
// // // //                     Start Time (Epoch):
// // // //                     <input
// // // //                         type="number"
// // // //                         value={startTime}
// // // //                         onChange={(e) => setStartTime(e.target.value)}
// // // //                         placeholder="e.g. 1725850449"
// // // //                         required
// // // //                     />
// // // //                 </label>
// // // //                 <br />

// // // //                 <label>
// // // //                     End Time (Epoch):
// // // //                     <input
// // // //                         type="number"
// // // //                         value={endTime}
// // // //                         onChange={(e) => setEndTime(e.target.value)}
// // // //                         placeholder="e.g. 1725855086"
// // // //                         required
// // // //                     />
// // // //                 </label>
// // // //                 <br />

// // // //                 <button type="submit" disabled={loading}>
// // // //                     {loading ? "Searching..." : "Search"}
// // // //                 </button>
// // // //             </form>

// // // //             {/* Display Results */}
// // // //             <h3>Search Results</h3>
// // // //             {loading && <p>Loading...</p>}
// // // //             {error && <p style={{ color: "red" }}>{error}</p>}

// // // //             {results.length > 0 ? (
// // // //                 <ul>
// // // //                     {results.map((event, index) => (
// // // //                         <li key={index}>
// // // //                             <strong>Source Address:</strong> {event.source_address} <br />
// // // //                             <strong>Destination Address:</strong> {event.destination_address} <br />
// // // //                             <strong>Action:</strong> {event.action} <br />
// // // //                             <strong>Log Status:</strong> {event.log_status} <br />
// // // //                             <strong>File:</strong> {event.file} <br />
// // // //                         </li>
// // // //                     ))}
// // // //                 </ul>
// // // //             ) : (
// // // //                 !loading && <p>No results found.</p>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default SearchEvents;


// // // import React, { useState } from "react";

// // // const SearchEvents = () => {
// // //   const [query, setQuery] = useState("");
// // //   const [startTime, setStartTime] = useState("");
// // //   const [endTime, setEndTime] = useState("");
// // //   const [results, setResults] = useState([]);
// // //   const [error, setError] = useState("");

// // //   const handleSearch = async () => {
// // //     setError(""); // Clear previous errors
// // //     setResults([]); // Clear previous results

// // //     if (!query || !startTime || !endTime) {
// // //       setError("Please enter all fields.");
// // //       return;
// // //     }

// // //     // Ensure Start & End Time are valid numbers (Epoch timestamps)
// // //     if (isNaN(startTime) || isNaN(endTime)) {
// // //       setError("Start Time and End Time must be valid epoch timestamps.");
// // //       return;
// // //     }

// // //     const apiUrl = "http://127.0.0.1:8000/search/";
// // //     try {
// // //         fetch(`${apiUrl}?query=${query}&start_time=${startTime}&end_time=${endTime}`)

// // //         .then(response => {
// // //             if (!response.ok) {
// // //               throw new Error(`Server returned ${response.status} error`);
// // //             }
// // //             return response.json();
// // //           })
// // //           .then(data => {
// // //             console.log("Search results:", data);
// // //             setResults(data.results); // Assuming you're using React state
// // //           })
// // //           .catch(error => {
// // //             console.error("Error fetching data:", error);
// // //           });

// // //   return (
// // //     <div>
// // //       <h2>Event Search</h2>
// // //       <label>Query: </label>
// // //       <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />

// // //       <label>Start Time (Epoch): </label>
// // //       <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

// // //       <label>End Time (Epoch): </label>
// // //       <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

// // //       <button onClick={handleSearch}>Search</button>

// // //       {error && <p style={{ color: "red" }}>{error}</p>}

// // //       <h3>Search Results</h3>
// // //       {results.length === 0 ? (
// // //         <p>No results found.</p>
// // //       ) : (
// // //         <ul>
// // //           {results.map((event, index) => (
// // //             <li key={index}>{JSON.stringify(event)}</li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default SearchEvents;



// // import React, { useState } from "react";

// // const SearchEvents = () => {
// //   const [query, setQuery] = useState("");
// //   const [startTime, setStartTime] = useState("");
// //   const [endTime, setEndTime] = useState("");
// //   const [results, setResults] = useState([]);
// //   const [error, setError] = useState("");

// //   const handleSearch = async () => {
// //     setError(""); // Clear previous errors
// //     setResults([]); // Clear previous results

// //     if (!query || !startTime || !endTime) {
// //       setError("Please enter all fields.");
// //       return;
// //     }

// //     // Ensure Start & End Time are valid numbers (Epoch timestamps)
// //     if (isNaN(startTime) || isNaN(endTime)) {
// //       setError("Start Time and End Time must be valid epoch timestamps.");
// //       return;
// //     }

// //     const apiUrl = "http://127.0.0.1:8000/api/search/";

// //     try {
// //       const response = await fetch(`${apiUrl}?query=${query}&start_time=${startTime}&end_time=${endTime}`);

// //       if (!response.ok) {
// //         throw new Error(`Server returned ${response.status} error`);
// //       }

// //       const data = await response.json();
// //       console.log("Search results:", data);

// //       // Assuming backend returns an array of objects
// //       setResults(data); // Fix: No need to access `data.results` if API returns a list
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //       setError("Failed to fetch data. Please try again.");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Event Search</h2>
// //       <label>Query: </label>
// //       <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />

// //       <label>Start Time (Epoch): </label>
// //       <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

// //       <label>End Time (Epoch): </label>
// //       <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

// //       <button onClick={handleSearch}>Search</button>

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       <h3>Search Results</h3>
// //       {results.length === 0 ? (
// //         <p>No results found.</p>
// //       ) : (
// //         <ul>
// //           {results.map((event, index) => (
// //             <li key={index}>{JSON.stringify(event)}</li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchEvents;

// import React, { useState } from "react";

// const SearchEvents = () => {
//   const [query, setQuery] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [results, setResults] = useState([]);  // Ensure default state is an empty array
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     setError(""); // Clear previous errors
//     setResults([]); // Reset results

//     if (!query || !startTime || !endTime) {
//       setError("Please enter all fields.");
//       return;
//     }

//     if (isNaN(startTime) || isNaN(endTime)) {
//       setError("Start Time and End Time must be valid epoch timestamps.");
//       return;
//     }

//     const apiUrl = "http://127.0.0.1:8000/api/search/";

//     try {
//       const response = await fetch(`${apiUrl}?query=${query}&start_time=${startTime}&end_time=${endTime}`);

//       if (!response.ok) {
//         throw new Error(`Server returned ${response.status} error`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data); // Debugging API response

//       // Ensure `data` is an array, fallback to empty array
//       setResults(Array.isArray(data) ? data : []);

//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to fetch data. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Event Search</h2>
//       <label>Query: </label>
//       <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />

//       <label>Start Time (Epoch): </label>
//       <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

//       <label>End Time (Epoch): </label>
//       <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

//       <button onClick={handleSearch}>Search</button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <h3>Search Results</h3>
//       {results.length === 0 ? (
//         <p>No results found.</p>
//       ) : (
//         <ul>
//           {results.map((event, index) => (
//             <li key={index}>{JSON.stringify(event)}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchEvents;
// import React, { useState } from "react";

// const SearchEvents = () => {
//   const [query, setQuery] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = () => {
//     if (!query || !startTime || !endTime) {
//       alert("Please enter all fields before searching.");
//       return;
//     }

//     fetch(`http://127.0.0.1:8000/search/?query=${query}&start_time=${startTime}&end_time=${endTime}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API Response:", data); // Debugging
//         if (data.results && Array.isArray(data.results)) {
//           setResults(data.results); // Store only the array
//         } else {
//           setResults([]); // Handle empty or unexpected responses
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>Event Search</h1>
//       <div style={{ marginBottom: "10px" }}>
//         <label>Query: </label>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <label> Start Time (Epoch): </label>
//         <input
//           type="text"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//         />
//         <label> End Time (Epoch): </label>
//         <input
//           type="text"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       <h2>Search Results</h2>
//       {results.length === 0 ? (
//         <p>No results found.</p>
//       ) : (
//         <table border="1" style={{ margin: "0 auto", width: "80%" }}>
//           <thead>
//             <tr>
//               <th>Event</th>
//               <th>Filename</th>
//               <th>Search Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.event}</td>
//                 <td>{item.filename}</td>
//                 <td>{item.search_time} ms</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default SearchEvents;

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
