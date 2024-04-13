# Project Title

## 1. Project Description

Our team, BBY#03, has developed a hospital wait time application to assist the people in Metro Vancouver in reducing wait times in emergency rooms. The application provides live updates on wait times and guides users to the appropriate hospital. Users can locate and view the wait times of each emergency room in Metro Vancouver. Our app retrieves information about the user's current location and calculates the distance to the nearest hospital using longitude and latitude coordinates. Wait times are categorized based on time periods. The wait time displayed in Navigation 1 represents the average wait time at the current hospital for that specific time. Average wait times are derived from user input. If a user enters the hospital's radius, our app prompts them to confirm their location. If they leave the radius, the app prompts them to confirm their departure, allowing us to calculate the duration of their stay. Additionally, users can submit time reviews for each hospital.

## 2. Names of Contributors

List team members and/or short bio's here...

- Hi, my name is parham, I'm so exicted to work with my team as they're equally collaborative.
- Hello, I'm Marcus, an international student from Brazil and yes, I like soccer.
- Hello! My name is Jason Hong. I like to play basketball.
- ...

## 3. Technologies and Resources Used

List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

- HTML, CSS, JavaScript
- Bootstrap 5.0 (Frontend library)
- Firebase 8.0 (BAAS - Backend as a Service)
- google maps api
-swal

## 4. Complete setup/installion/usage

State what a user needs to do when they come to your project. How do others start using your code or application?
Here are the steps ...

- Login to the using email and password/ sign up
- check the hospital near by 
- get hospital details: wait time, address, hours..etc

## 5. Known Bugs and Limitations

Here are some known bugs:

-When hosting the website the user loaction is not tracked
-
-

## 6. Features for Future

What we'd like to build in the future:

-Bulid more mobile based application( right now it's more focused on web)
-More acurate information for each hospital
-user dash broad for communication.

## 7. Contents of Folder

Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── .firebaserc              # Firebase hosting related file
├── firebase.json            # Firebase hosting related file
├── firestore.indexes.json   # Firebase hosting related file
├── firestore.rules          # Firebase hosting related file
├   index.html                   # the login page for the userwhen you come to url
├

main.html                # the home page HTML file, for a logged in user
map.html                 # shows the map of the hospital
navigation1.html         # display the wait time for each hospital
navigation2.html         #display hospital information
navigation3.html         # navigate users to the right hospital
reviewLoc.html           #confrims to user after review is submmited 
saved.html               #displays the book marked hospitals
        
        
        authentication.js            #user login logic 
        distenceReview.js            #logic for to time the user in the hosptal 
        notused.js                   #deprecated script
        populatehospital.js          #logic of populating the hospital
        saved.js                     #logic of the saved hospital
        scripts.js                   #the log out logic
        skeleton.js                  #the main frame of all the scripts
        udateAverage.js              #the logic to update the average time of the day
        updateTotalWaittime.js       #the logic to update the sub collection of each hospital in by the user review


l


└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blah.jpg                # Acknowledge source
├── scripts                  # Folder for scripts
    /blah.js                 #
├── styles                   # Folder for styles
    /blah.css                #



```
