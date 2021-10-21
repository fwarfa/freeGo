## Project Name 

    FreeGO 

## Description 
Caut!on Tech, LLC which a is new rising company, founded by Sulaiman Bada (Sully), that creates technology and platforms to help keep people safe during their day-to-day activities.

In the mists of COVID-19, I realize that I have always valued safety especially being from another country. I wanted a way to make sure that people felt safer in the communities. A platform that keeps people safe during their day to day activities: FreeGo: Hazard Free Travel. This platform encompasses some of the values that I hold dear to me like community, safety, and knowledge through information.

FreeGo is a mobile application that allows the user to travel hazard free! With FreeGo, users will be able to receive live updates on hazards that are occurring in their area and be able to see them on rendered on a map! All hazards are posted by other users in the area that saw and reported that issue as well as hazards reported from external sources such as police department here Minneapolis. This way, users can use this application to keep themselves and others safe during their day-to-day lives.  

Live demo of the project can be found here: https://ancient-savannah-42403.herokuapp.com/#/map

# EDA Project
This version uses React, Redux, Express, Passport, PostgreSQL, and Node (a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

Create a new database called `freeGo` and  Copy the content in database.sql file  within the project and paste that into your database editor of your choice and execute that. 

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  REACT_APP_GOOGLE_API_KEY=YOUR_API_KEY
  ```
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`


## Usage 
