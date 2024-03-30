//Global variable pointing to the current user's Firestore document
var currentUser;   

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users1").doc(user.uid); //global
            console.log(currentUser);

            // figure out what day of the week it is today
            // const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            // const d = new Date();
            // let day = weekday[d.getDay()];

            // the following functions are always called when someone is logged in
            // readQuote(day);
            // insertNameFromFirestore();
            displayHospitalsDynamically("hospitals");
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();


function displayHospitalsDynamically(collection) {

    let cardTemplate = document.getElementById("HositalCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   
        .then(allHospitals => {
            let currentTime = new Date();
            console.log(currentTime.getHours());
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allHospitals.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var hospitalCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var hospitalAddress = doc.data().address; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                var waitTime;
                var lastUpdate = currentTime; //gets the length field

                if (currentTime.getHours() >= 5  && currentTime.getHours() <= 11) {
                    waitTime = doc.data().hospital_wait_time_morning;    
                 }else if (currentTime.getHours() > 11  && currentTime.getHours() <= 17){
                    waitTime = doc.data().hospital_wait_time_afternoon;
                 }else if (currentTime.getHours() > 17  && currentTime.getHours() <= 23){
                    waitTime = doc.data().hospital_wait_time_night;
                 }else if (currentTime.getHours() === 24  && currentTime.getHours() >= 0){
                    waitTime = doc.data().hospital_wait_time_after_midnight;
                 }

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                if(waitTime <= 1){
                    newcard.querySelector('.card-time').innerHTML = waitTime + " Hour";
                   }else{
                    newcard.querySelector('.card-time').innerHTML = waitTime + " Hours";
                   }

                   newcard.querySelector('.card-update').innerHTML ="- " + lastUpdate;

                newcard.querySelector('.card-address').innerHTML = hospitalAddress;
                // newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-img-top').src = `./images/${hospitalCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "navigation2.html?docID="+docID;
                newcard.querySelector('i').id = 'save-' + docID;   //guaranteed to be unique
                newcard.querySelector('i').onclick = () => updateBookmark(docID);

                
                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                currentUser.get().then( userDoc => {
                    //get the user name
                    var bookmarks = userDoc.data().bookmarks;
                    if ( bookmarks && bookmarks.includes( docID ) ) {
                        document.getElementById( 'save-' + docID ).innerText = 'bookmark';
                    }
                } )
                

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

  //input param is the name of the collection




function updateBookmark(id) {
    currentUser.get().then(userDoc => {
        let bookmarksNow = userDoc.data().bookmarks;
        // console.log(bookmarksNow)

        // Check if bookmarksNow is defined and if this bookmark already exists in Firestore
        if (bookmarksNow && bookmarksNow.includes(id)) {
            console.log(id);
            // If it does exist, then remove it
            currentUser
                .update({
                    bookmarks: firebase.firestore.FieldValue.arrayRemove(id),
                })
                .then(function () {
                    console.log("This bookmark is removed for" + currentUser);
                    var iconID = "save-" + id;
                    console.log(iconID);
                    document.getElementById(iconID).innerText = "bookmark_border";
                    
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Bookmark Removed",
                        showConfirmButton: false,
                      });
                });
        } else {
            // If it does not exist, then add it
            currentUser
                .set(
                    {
                        bookmarks: firebase.firestore.FieldValue.arrayUnion(id),
                    },
                    {
                        merge: true,
                    }
                )
                .then(function () {
                    console.log("This bookmark is for" + currentUser);
                    var iconID = "save-" + id;
                    console.log(iconID);
                    document.getElementById(iconID).innerText = "bookmark";

                    Swal.fire({
                        position: "middle",
                        icon: "success",
                        title: "Bookmarked",
                        showConfirmButton: false,
                        timer: 1500
                      });

                });
        }
    });


}


