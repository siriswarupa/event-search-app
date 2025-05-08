A simple Django application with a ReactJS frontend
A web application where users can search through event data files using a search query and time range.
The backend handles multiple simultaneous search requests and return the results to the frontend.
The UI allow users to search for events using three parameters:
1. Search String → Users can search for an IP address or a specific field.
- Example:
- Searching for a specific IP → `58.205.48.62`
- Searching for a specific field → `dstaddr=221.181.27.227`
2. Earliest Time (Start Time) → The epoch time when the search should start.
- Example: `1725850449`
3. Latest Time (End Time) → The epoch time when the search should end.
- Example: `1725855086`
RESULTS:
Event Found: 159.62.125.136 → 30.55.177.194 | Action: REJECT | Log Status: OK
File: events_2025.log
Search Time: 0.52 seconds
