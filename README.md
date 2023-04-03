# owlreport
This is a time report web app built with React. In order to run the app you need to run this Swagger API on the same machine: https://github.com/SimonFranden/owlreportAPI

##Installation:
----
*Clone this Repo.
 
 *Run these commands in the terminal:
  npm i react-router-dom --save
  npm i react-bootstrap --save
  npm install bootstrap
  npm install @mui/material @emotion/react @emotion/styled
  npm install @mui/x-date-pickers
  npm install dayjs

*Make sure to have the API program running

*Then run the command: npm start


##Code structure
---
App.js: Has a router that control what page is being displayed.

Navbar.js: Has links so the user can select which page the router in App.js should route to.

Login.js: The login page where the user logs in and stores userinformation that is nessecary when using the app

TimesheetUI.js: The page responsible for displayning all the latest time reports. also the page where the user can make a time report.

TimeSheetModal.js: A component in TimesheetUI that displays a popup modal with a form to make a time report.

ProjectsPage.js: The page where you can see all the projects in the database with various information about the projects.

EditProjectModal.js: A component that is being rendered on the project that the user is the project owner of. In this modal you can edit the project settings ans members.

DeleteProjectModal.js: A popup modal where the projectowner can delete the project.
