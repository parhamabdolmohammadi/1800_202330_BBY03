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
            
            
            // only populate title, and image
            document.getElementById( "hopital_name" ).innerHTML = hospitalName;
            document.getElementById( "hospital-address" ).innerHTML = hospitalAddress;
            console.log(hospitalAddress)
            let imgEvent = document.getElementById("hospital_image");
            imgEvent.src = "../images/" + hospitalCode + ".jpg";
           
                
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
    

    // Get the star rating
		// Get all the elements with the class "star" and store them in the 'stars' variable
    // const stars = document.querySelectorAll('.star');
	// 	// Initialize a variable 'hikeRating' to keep track of the rating count
    // let hikeRating = 0;
	// 	// Iterate through each element in the 'stars' NodeList using the forEach method
    // stars.forEach((star) => {
	// 			// Check if the text content of the current 'star' element is equal to the string 'star'
    //     if (star.textContent === 'star') {
	// 					// If the condition is met, increment the 'hikeRating' by 1
    //         hikeRating++;
    //     }
    // });

    // console.log(hikeTitle, hikeLevel, hikeSeason, hikeDescription, hikeFlooded, hikeScrambled, hikeRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        hospitalDocID = localStorage.getItem("hospitalDocID");

        console.log(user)
        // Get the document for the current user.
         db.collection("hospitals").doc(hospitalDocID).collection("hospitals-reviews").add({
            reviewer : user.displayName,
            email: user.email,
            daytime: dateVisited,
             date :daytimeSpecified,      
            hours : hoursWaited,
            minutes : minutesWaited
         }).then(() => {
             window.location.href = "thanks.html"; // Redirect to the thanks page
         });
    } else {
        console.log("No user is signed in");
        window.location.href = 'navigation1.html';
    }
}

document.getElementById("reviewForm").addEventListener("click", writeReview);
