// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;



// // import React from "react";

// // const App = () => {
// //   return (
// //     <div>
// //       <h1>Event Log Search</h1>
// //       <p>Start building your frontend here!</p>
// //     </div>
// //   );
// // };

// // export default App;



// // // // import React from "react";
// // // // import SearchEvents from "./SearchEvents";

// // // // function App() {
// // // //     return (
// // // //         <div>
// // // //             <SearchEvents />
// // // //         </div>
// // // //     );
// // // // }
// // // // const App = () => {
// // // //   return (
// // // //     <div>
// // // //       <h1>Event Log Search</h1>
// // // //       <p>Start building your frontend here!</p>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default App;
// // // import SearchEvents from "./SearchEvents";


// // // import React, { useState } from 'react';

// // // function App() {
// // //   const [searchString, setSearchString] = useState('');
// // //   const [startTime, setStartTime] = useState('');
// // //   const [endTime, setEndTime] = useState('');
// // //   const [events, setEvents] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   // Function to handle the search request
// // //   const handleSearch = async () => {
// // //     try {
// // //       const response = await fetch("http://127.0.0.1:5000/api/events", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           searchString: searchString,  // Use searchString to match Flask endpoint
// // //           startTime: parseInt(startTime),  // Ensure it's an integer
// // //           endTime: parseInt(endTime),  // Ensure it's an integer
// // //         }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Failed to fetch events');
// // //       }

// // //       const data = await response.json();
// // //       setEvents(data);  // Update the events with search results
// // //     } catch (error) {
// // //       console.error(error);
// // //       setError(error.message);  // Set error message if request fails
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Event Search</h1>

// // //       {/* Search Form */}
// // //       <div>
// // //         <input
// // //           type="text"
// // //           placeholder="Search String (IP or Field)"
// // //           value={searchString}
// // //           onChange={(e) => setSearchString(e.target.value)}
// // //         />
// // //         <input
// // //           type="number"
// // //           placeholder="Earliest Time (Start Time)"
// // //           value={startTime}
// // //           onChange={(e) => setStartTime(e.target.value)}
// // //         />
// // //         <input
// // //           type="number"
// // //           placeholder="Latest Time (End Time)"
// // //           value={endTime}
// // //           onChange={(e) => setEndTime(e.target.value)}
// // //         />
// // //         <button onClick={handleSearch}>Search</button>
// // //       </div>

// // //       {/* Display errors */}
// // //       {error && <p style={{ color: 'red' }}>{error}</p>}

// // //       {/* Display event search results */}
// // //       <div>
// // //         {events.length > 0 ? (
// // //           events.map((event, index) => (
// // //             <div key={index}>
// // //               <p>Event Found: {event.srcaddr} → {event.dstaddr} | Action: {event.action} | Log Status: {event.log_status}</p>
// // //               <p>File: {event.file}</p>
// // //               <p>Search Time: {event.search_time} seconds</p>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <p>No events found</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;



// import React, { useState } from "react";

// function App() {
//   const [query, setQuery] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (!query || !startTime || !endTime) {
//       setError("Please fill all fields.");
//       return;
//     }

//     setError(null);

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/search/?query=${query}&start_time=${startTime}&end_time=${endTime}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch data.");
//       }

//       const data = await response.json();
//       setResults(data.results);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Event Search</h1>
//       <div>
//         <label>Query: </label>
//         <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
//       </div>
//       <div>
//         <label>Start Time (Epoch): </label>
//         <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
//       </div>
//       <div>
//         <label>End Time (Epoch): </label>
//         <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
//       </div>
//       <button onClick={handleSearch}>Search</button>

//       <h2>Search Results</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <ul>
//         {results.length > 0 ? (
//           results.map((item, index) => <li key={index}>{JSON.stringify(item)}</li>)
//         ) : (
//           <p>No results found.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;


import React from "react";
import SearchEvents from "./SearchEvents";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <SearchEvents />
    </div>
  );
}

export default App;
