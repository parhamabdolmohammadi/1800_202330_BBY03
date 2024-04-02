var hospReview = true, ignore = 1;
let closestName, closestDist = 50, closeID;

localStorage.removeItem("waitingHospID");

async function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    db.collection("hospitals").get().then((allHospitals) => {
        allHospitals.forEach((doc) => {
            let d = distance(doc.data().lat, doc.data().lng);
            if (d < closestDist) {
                closestDist = d;
                closestName = doc.data().name;
                closeID = doc.id;
            }

        });

        if (localStorage.getItem("waitingHospID") == null && closeID != ignore && closestDist < 0.25) {
            let r = window.confirm("Are you going to " + closestName + "?");
            if (r) {
                localStorage.setItem('timeAtHospital', new Date().getTime());
                localStorage.setItem("waitingHospID", closeID);
                console.log(localStorage.getItem("waitingHospID"), closestDist);
            } else {
                ignore = closeID;
                console.log("Ignore this ID: " + ignore);
            }
            /* 
                VERY IMPORTANT
                Change the value of both ifs for the actual radius of the hospital.
                So add a
                    && closestDist > radius
            */
        } else if (localStorage.getItem("waitingHospID") == closeID && closestDist > 0.25) {
            let r = window.confirm("Are you getting out of " + closestName + "?");
            if (r) {
                let waitedHospId = localStorage.getItem("waitingHospID");
                let hospWait = (new Date().getTime() - localStorage.getItem("timeAtHospital")) / 1000;
                console.log(waitedHospId, hospWait);

                proxReview(waitedHospId, hospWait);


                localStorage.removeItem("waitingHospID");
                localStorage.removeItem("timeAtHospital");
            }
        }

    });

}

//parameters: ID of the hospital you are waiting, wait time of the hospital you are waiting in seconds
function proxReview(IDhosp, waitTimeSec) {
    let currentTime = new Date();
    if (currentTime.getHours() >= 5 && currentTime.getHours() <= 11)
        daytimeSpecified = "Morning 6AM - 12PM";
    else if (currentTime.getHours() > 11 && currentTime.getHours() <= 17)
        daytimeSpecified = "Afternoon 12PM - 6PM";
    else if (currentTime.getHours() > 17 && currentTime.getHours() <= 23)
        daytimeSpecified = "Night 6PM - 12AM";
    else if (currentTime.getHours() === 24 && currentTime.getHours() >= 0)
        daytimeSpecified = "Midnight 12PM - 6AM";
    else
        daytimeSpecified = "Error";

    let dateVisited = currentTime.getDate() + "-" + currentTime.getMonth() + "-" + currentTime.getFullYear();

    /*
     * PLEASE COMMENT THIS NEXT LINE BEFORE ACTUALLY USING IT TO CALCULATE TIME
     */
    waitTimeSec = 4500;

    let hoursWaited = Math.floor(waitTimeSec / 3600);
    waitTimeSec -= hoursWaited * 3600;
    let minutesWaited = Math.ceil(waitTimeSec / 60);

    let user = firebase.auth().currentUser;
    if (user) {
        console.log(IDhosp);
        db.collection("hospitals").doc(IDhosp).collection("hospitals-reviews").add({
            reviewer: user.displayName,
            email: user.email,
            daytime: daytimeSpecified,
            date: dateVisited,
            hours: hoursWaited,
            minutes: minutesWaited
        }).then(() => {
            alert("Thank you for your review");
            hospReview = false;
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'navigation1.html';
    }
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

function distance(latHosp, lngHosp) {
    let R = 6371; // Radius of the earth in km
    let dLat = toRad(lat - latHosp);  // Javascript functions in radians
    let dLon = toRad(lng - lngHosp);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) * Math.cos(toRad(latHosp)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
}

//Function to keep checking the user's distance to a hospital
function deltaReview() {
    if (hospReview) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Browser doesn't support geolocation.");
        }
    }
}

setInterval(deltaReview, 5000);
