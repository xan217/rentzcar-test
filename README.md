### rentzcar-test

# RENTZCAR Test project 
#### by Xan217

## Backend
- Developed in node/express
- Connected to the football API with the limitations of the free version account
- Database management in Mongo (it is actually not too much to do with the DB more than save the regs)

TODO:
- Update the matches endpoint to manage dates

## Frontend
- Developed on Vue3 
- Basic interface for data presentation 
- The view with all the details is not developed

TODO: 
- Update the request for to manage dates
- Load matches previous to the actual date (I realize I wasn't loading previous matches in the final tests)

## Tests
- Developed tests to validate the DB connection and the endpoints provided
- Actually not working for some node/jest versions incompatibilities

## HOW TO RUN
- There are two bash files to run and stop all the docker containers
- Just use to run:
bash runAll.sh
- Use to stop:
bash stopAll.sh
