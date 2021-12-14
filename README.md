# DBMS-Project-moment

## Frontend

## Client
- To run the client locally, clone the repo, run `npm install` followed by `npm start`. 
- The React application is hosted on port 3000 by default.
- This app makes extensive usage of Material UI, in an attempt to follow modern design standards and make the UI uniform.

### Summarized program flow:
- An implicit check is performed before the component loads to verify whether a login token exists. This token is part of the JWT based authentication flow implemented in the application. If the token exists and is active, the user is redirected to the `Admin` or `Student` home page based on the role associated with the username in the database. Users are also redirected to the corresponding home page automatically after registration.  
- A `Student` role has the ability to then filter classroom availability by date, timeslot, and room capacity. He can then make a request, which is added to the appropriate collection. Students will also have a very concise view of the entire timetable for a particular day, and can view past requests.
- An `Admin` role can view all the pending requests and choose whether to approve or deny them. The `Admin` can also view all closed requests separately.

#### Student homepage
- Students have the ability to filter by the date and timeslot and select a classroom. The list of classrooms they can choose is dynamically filtered by making a database query through the server upon filter application. The request made is added to the `room_reqs` collection with a default status value of 'pending'.
- A key feature implemented is the ability for students to view a dynamic timetable for all slots and classrooms for the next seven days. This feature, and a big part of the application is based around the `schedule` collection. Implementing the timetable and schedule collection was fairly complicated and extremely critical to this application.
- Students can also view all previous requests made by them (requests filtered by username), and can view the status of those requests.
- Future expansions will include a way for students to delete pending requests,  auto delete duplicate requests, and assign multiple priority levels.

#### Admin homepage
- The most important role of the admin is to approve or reject room requests, which will then be reflected instantly in the timetable. Admins can also view the timetable, and have the ability to view all past requests.
- Future expansions here are student management and the ability to export all the requests as a csv file.


## Backend
- Flask based REST API
- Dynamically programmed to easily make changes


### Endpoints
- `POST /register`
- `POST /login`
- `GET /schedule`
- `POST /schedule`
- `GET /user/requests`
- `POST /user/requests`
- `GET /admin/requests`
- `POST /admin/requests`