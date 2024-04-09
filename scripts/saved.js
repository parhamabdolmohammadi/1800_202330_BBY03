//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getBookmarks(user)
            insertNameFromFirestore(user)
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();

function insertNameFromFirestore(user) {
    db.collection("users1").doc(user.uid).get().then(userDoc => {
        userName = userDoc.data().name;
        document.getElementById("name-goes-here").innerHTML = userName;
    })

}

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getBookmarks(user) {
    db.collection("users1").doc(user.uid).get()
        .then(userDoc => {

            // Get the Array of bookmarks
            var bookmarks = userDoc.data().bookmarks;

            // Get pointer the new card template
            let cardTemplate = document.getElementById("HositalCardTemplate");

            // Iterate through the ARRAY of bookmarked hikes (document ID's)
            bookmarks.forEach(thisHikeID => {
                db.collection("hospitals").doc(thisHikeID).get().then(doc => {
                    var title = doc.data().name;       // get value of the "name" key
                    // var details = doc.data().details;  // get value of the "details" key
                    var hospitalCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                    var hospitalAddress = doc.data().address; //gets the length field
                    var docID = doc.id;
                    var lastUpdate = doc.data().last_updated.toDate();
                    var waitTime;
                    let currentTime = new Date();
                    let currentHour = currentTime.getHours();
                    let orderByField;

                    // Determine the field to order by based on the current time
                    if (currentHour >= 5 && currentHour <= 11) {
                        orderByField = "hospital_wait_time_morning";
                    } else if (currentHour > 11 && currentHour <= 17) {
                        orderByField = "hospital_wait_time_afternoon";
                    } else if (currentHour > 17 && currentHour <= 23) {
                        orderByField = "hospital_wait_time_night";
                    } else {
                        orderByField = "hospital_wait_time_after_midnight";
                    }

                    // Determine wait time based on current hour
                    if (currentHour >= 5 && currentHour <= 11) {
                        waitTime = doc.data().hospital_wait_time_morning;
                    } else if (currentHour > 11 && currentHour <= 17) {
                        waitTime = doc.data().hospital_wait_time_afternoon;
                    } else if (currentHour > 17 && currentHour <= 23) {
                        waitTime = doc.data().hospital_wait_time_night;
                    } else if (currentHour == 24 || currentHour >= 0) {
                        waitTime = doc.data().hospital_wait_time_after_midnight;
                    }

                    let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                    //update title and some pertinant information
                    newcard.querySelector('.card-time').innerHTML = waitTime <= 1 ? waitTime + " Hour" : waitTime + " Hours";

                    var waitTimeColour = newcard.querySelector('.card-time');
                    if (waitTime >= 0 && waitTime < 2) {
                        waitTimeColour.classList.add('green');
                    } else if (waitTime >= 2 && waitTime < 4) {
                        waitTimeColour.classList.add('orange');
                    } else {
                        waitTimeColour.classList.remove('green', 'orange');
                    }
                    newcard.querySelector('.card-update').innerHTML = lastUpdate.toLocaleString(); // Convert date to string format
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-address').innerHTML = hospitalAddress;
                    // newcard.querySelector('.card-text').innerHTML = details;
                    newcard.querySelector('.card-img-top').src = `./images/${hospitalCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector('a').href = "navigation2.html?docID=" + docID;

                    //Finally, attach this new card to the gallery
                    hospitalCardGroup.appendChild(newcard);
                })
            });
        })
}