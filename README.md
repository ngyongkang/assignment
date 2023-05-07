# assignment

## Installation & startup
### Docker startup
To start the application, use the docker command below.
```
docker compose up -d
```
To stop the application and remove all images use the docker command below.
```
docker compose down --rmi all
```
### NPM Startup
To start the application, use the following commands. you will need to start two terminals to launch the backend and frontend. In addition, you will also need to be in the directories of the folders to start the servers. 

E.g. 

C:\Users\USER\Desktop\Assignment\backend
C:\Users\USER\Desktop\Assignment\frontend

```
npm start
```
To stop the application, use Ctrl + c to stop the terminals you started it on.

## Explanation of the architecture of application
1. Backend
    - Backend consists of a simple express js server. With the routes created for the various user stories. The architecture of the backend was split into several folders such as middleware and routes to properly seperate the code.
    - Dockerising was also included for easier deployment of the application.
2. Frontend
    - Frontend consists of a simple react js server. With only one component called app. The architecture of the frontend is basic and was not changed much at all. The original copy was made from the react-create-app repo.
    - Dockerising was also included for easier deployment of the application.
3. Database
    - Due to the time constraint, I opt to do a really simple json database. The file is included in the backend folder. How the database works is by reading the file and updating it via a write. This is not the best way to perform a database. However, probably the easiest way to simulate a database.

## User stories
I was only able to finish user stories 1 and 2 and did not do the rest of the stories due to commitments from my current job. The stories are not 100% complete but I tried my best given the limited time I had.