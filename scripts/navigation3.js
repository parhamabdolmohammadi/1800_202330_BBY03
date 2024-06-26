function displayHospitalInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "hospitals" )
        .doc( ID )
        .get()
        .then( doc => {
            hospitalName = doc.data().name;
            hospitalCode = doc.data().code;
            hospitalAddress = doc.data().address;
            let currentTime = new Date();
            let currentHour = currentTime.getHours();
            var waitTime;
            if (currentHour >= 5 && currentHour <= 11) {
                waitTime = doc.data().hospital_wait_time_morning;    
             } else if (currentHour > 11 && currentHour <= 17){
                waitTime = doc.data().hospital_wait_time_afternoon;
             } else if (currentHour > 17 && currentHour <= 23){
                waitTime = doc.data().hospital_wait_time_night;
             } else if (currentHour == 24 || currentHour >= 0){
                waitTime = doc.data().hospital_wait_time_after_midnight;
             }
            
            console.log(waitTime);
            
            // only populate title, and image
            document.getElementById( "hopital_name" ).innerHTML = hospitalName;
            document.getElementById( "hospital-address" ).innerHTML = hospitalAddress;
            document.getElementById( "hospital-time" ).innerText = waitTime <= 1 ? waitTime + " Hour" : waitTime + " Hours";
            if (waitTime >= 0 && waitTime < 2) {
                document.getElementById("hospital-time").style.color = "green";
            } else if (waitTime >= 2 && waitTime < 4) {
                document.getElementById("hospital-time").style.color = "orange";
            } else {
                document.getElementById("hospital-time").style.color = "red";
            }
            console.log(hospitalAddress)
            let imgEvent = document.getElementById("hospital_image");
            imgEvent.src = "./images/" + hospitalCode + ".jpg";
           
                
        } );
}

displayHospitalInfo();

function saveHospitalDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('hospitalDocID', ID);
}

saveHospitalDocumentIDAndRedirect();

function writeReview() {
    console.log("inside write review");
    let daytimeSpecified = document.querySelector('input[name="daytime"]:checked').value;
    console.log(daytimeSpecified);
    let dateVisited = document.getElementById("date").value;
    console.log(dateVisited);
    let hoursWaited = document.getElementById("hours-waited").value;
    hoursWaited = Math.floor(hoursWaited)
    if(hoursWaited >= 24 || hoursWaited < 0) {
        return;
    }
    console.log(hoursWaited);
    let minutesWaited = document.getElementById("minutes-waited").value;
    minutesWaited = Math.floor(minutesWaited)
    if(minutesWaited >= 60 || minutesWaited < 0) {
        return;
    }
    console.log(minutesWaited);


    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        hospitalDocID = localStorage.getItem("hospitalDocID");

        console.log(user)
         db.collection("hospitals").doc(hospitalDocID).collection("hospitals-reviews").add({
            reviewer : user.displayName,
            email: user.email,
            daytime: dateVisited,
            date :daytimeSpecified,      
            hours : hoursWaited,
            minutes : minutesWaited
         }).then(() => {
            Swal.fire({
                position: "middle",
                icon: "success",
                title: "Review Submitted Successfully",
                showConfirmButton: false,
                timer: 1500
              }); // Redirect to the thanks page
         });
    } else {
        console.log("No user is signed in");
        window.location.href = 'navigation1.html';
    }
}

document.getElementById("reviewForm").addEventListener("click", writeReview);

showPosition();

async function showPosition() {

    let ID = localStorage.getItem('hospitalDocID');

    await db.collection("hospitals")
    .doc(ID)
    .get()
    .then(doc => {
        lat = doc.data().lat;
        lng = doc.data().lng;
    });

    console.log(lat, lng);

    await initMap();

}

async function initMap() {
    // The location of Uluru
    const position = { lat: lat, lng: lng };
    // Request needed libraries.
    //@ts-ignore
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    let map = new Map(document.getElementById("here"), {
        zoom: 12,
        center: position,
        mapId: "map",
    });

    const pinUser = new PinElement({
        background: "#FFFFFF",
    });

    // The marker, positioned at Uluru
    marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Hospital",
        gmpClickable: true,
        content: pinUser.element,
    });
}


function writeReviewUpdate() {
    let daytimeSpecified = document.querySelector('input[name="daytime"]:checked').value;
    let dateVisited = document.getElementById("date").value;
    let hoursWaited = parseInt(document.getElementById("hours-waited").value);
    let minutesWaited = parseInt(document.getElementById("minutes-waited").value);

    let hoursWaitedAM = 0;
    let hoursWaitedPM = 0;
    let hoursWaitedNIGHT = 0;
    let hoursWaitedMidNight = 0;

    switch (daytimeSpecified) {
        case "Morning 6AM - 12PM":
            hoursWaitedAM = hoursWaited * 60 + minutesWaited;
            break;
        case "Afternoon 12PM - 6PM":
            hoursWaitedPM = hoursWaited * 60 + minutesWaited;
            break;
        case "Night 6PM - 12AM":
            hoursWaitedNIGHT = hoursWaited * 60 + minutesWaited;
            break;
        case "Midnight 12AM - 6AM":
            hoursWaitedMidNight = hoursWaited * 60 + minutesWaited;
            break;
        default:
            break;
    }

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        hospitalDocID = localStorage.getItem("hospitalDocID");

        db.collection("hospitals").doc(hospitalDocID).collection("hospitals-reviews").add({
            reviewer: user.displayName,
            email: user.email,
            date: dateVisited,
            daytime: daytimeSpecified,
            hours: hoursWaited,
            minutes: minutesWaited,
            totalWaitTimeAM: hoursWaitedAM,
            totalWaitTimePM: hoursWaitedPM,
            totalWaitTimeNIGHT: hoursWaitedNIGHT,
            totalWaitTimeMidNight: hoursWaitedMidNight,
        }).then(() => {
            alert("Thank you");
            updateTime();
        }).catch((error) => {
            console.error("Error adding review: ", error);
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'navigation1.html';
    }
}

document.getElementById("reviewForm").addEventListener("click", writeReviewUpdate);
