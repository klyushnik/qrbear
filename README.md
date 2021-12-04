## QRBear
QRBear is a full-stack inventory system written in Node.js, Express, and React.js. It works with an MySQL database, the scheme of which can be found in the /sql folder.
## Backend
The backend includes the queries that will be executed against the database. If you have your own database structure, modify /server/index.js.
## Frontend
If you are changing the database stucture, make sure that you change the communication with the backend.
The following functions communicate with the backend:
* ModuleItemManagement.js/componentDidMount() - fetched the list of items and their SKUs.
* all others - will update in later commits