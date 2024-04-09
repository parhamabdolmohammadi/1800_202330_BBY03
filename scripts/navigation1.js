//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users1").doc(user.uid); //global
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
    let cardTemplate = document.getElementById("HositalCardTemplate");
    let dbQuery = db.collection(collection); // Start with the base query

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

    // Apply orderBy based on the determined field
    dbQuery = dbQuery.orderBy(orderByField);

    dbQuery.get()
        .then(allHospitals => {
            allHospitals.forEach(doc => {
                var title = doc.data().name;
                var details = doc.data().address;
                var hospitalCode = doc.data().code;
                var lastUpdate = doc.data().last_updated.toDate(); // Convert Firestore timestamp to JavaScript Date object
                var waitTime;

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

                let newcard = cardTemplate.content.cloneNode(true);
                var docID = doc.id;

                newcard.querySelector('.card-title').innerHTML = title;
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
                newcard.querySelector('.card-address').innerHTML = details;
                newcard.querySelector('.card-img-top').src = `./images/${hospitalCode}.jpg`;
                newcard.querySelector('a').href = "navigation2.html?docID=" + docID;
                newcard.querySelector('i').id = 'save-' + docID;
                newcard.querySelector('i').onclick = () => updateBookmark(docID);

                currentUser.get().then(userDoc => {
                    //get the user name
                    var bookmarks = userDoc.data().bookmarks;
                    if (bookmarks && bookmarks.includes(docID)) {
                        document.getElementById('save-' + docID).innerText = 'bookmark';
                    }
                })

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
        .catch(error => {
            console.error("Error getting documents: ", error);
        });
}


function displayTime() {
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var timeString = "CURRENT TIME: " + hours + ":" + minutes + ":" + seconds;
    document.getElementById("clock").innerHTML = timeString;
}

setInterval(displayTime, 1000);

function updateBookmark(id) {
    currentUser.get().then(userDoc => {
        let bookmarksNow = userDoc.data().bookmarks;

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
                    {bookmarks: firebase.firestore.FieldValue.arrayUnion(id)},
                    {merge: true}
                )
                .then(function () {
                    var iconID = "save-" + id;
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


