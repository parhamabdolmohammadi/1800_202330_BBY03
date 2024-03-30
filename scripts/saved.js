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
        console.log(userDoc.data().name)
        userName = userDoc.data().name;
        console.log(userName)
        document.getElementById("name-goes-here").innerHTML = userName;
    })

}

//----------------------------------------------------------
// Wouldn't it be nice to see the User's Name on this page?
// Let's do it!  (Thinking ahead:  This function can be carved out, 
// and put into script.js for other pages to use as well).
//----------------------------------------------------------//----------------------------------------------------------




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
            console.log(bookmarks);
						
						// Get pointer the new card template
            let cardTemplate = document.getElementById("HositalCardTemplate");

						// Iterate through the ARRAY of bookmarked hikes (document ID's)
            bookmarks.forEach(thisHikeID => {
                console.log(thisHikeID);
                db.collection("hospitals").doc(thisHikeID).get().then(doc => {
                    var title = doc.data().name;       // get value of the "name" key
                    // var details = doc.data().details;  // get value of the "details" key
                    var hospitalCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                    var hospitalAddress = doc.data().address; //gets the length field
                    var docID = doc.id;
                    let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                    //update title and some pertinant information
                    newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-address').innerHTML = hospitalAddress;
                // newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-img-top').src = `./images/${hospitalCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "navigation2.html?docID="+docID;

                   

										//Finally, attach this new card to the gallery
                                        hospitalCardGroup.appendChild(newcard);
                })
            });
        })
}