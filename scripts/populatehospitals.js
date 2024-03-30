// Get a reference to the submit button and the textarea
// vancouverGeneralHospitalID = null;

// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
// function idRetriever(collection) {
//     // let cardTemplate = document.getElementById("hikeCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

//     db.collection(collection).get()   //the collection called "hikes"
//         .then(allHospitals=> {
//             //var i = 1;  //Optional: if you want to have a unique ID for each hike
//             allHospitals.forEach(doc => { //iterate thru each doc
//                 var title = doc.data().name;       // get value of the "name" key
//                 var HospitalID = doc.id;
//                 // var details = doc.data().details;  // get value of the "details" key
// 				// 				var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
//                 // var hikeLength = doc.data().length; //gets the length field
//                 // let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
//                 if (title === "Vancouver General Hospital" ) {
//                     vancouverGeneralHospitalID = HospitalID;
//                     console.log("id updated")
//                 }

                
//                 //update title and text and image
//                 // newcard.querySelector('.card-title').innerHTML = title;
//                 // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
//                 // newcard.querySelector('.card-text').innerHTML = details;
//                 // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg

//                 // //Optional: give unique ids to all elements for future use
//                 // // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//                 // // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//                 // // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//                 // //attach to gallery, Example: "hikes-go-here"
//                 // document.getElementById(collection + "-go-here").appendChild(newcard);

//                 //i++;   //Optional: iterate variable to serve as unique ID
//             })
//         })
// }



// idRetriever("hospitals");

function writeHospitals() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hospitalRef = db.collection("hospitals");

    hospitalRef.add({
        code: "vancouver-general-hospital",
        name: "Vancouver General Hospital", //replace with your own city?
        city: "Vancouver",
        province: "BC",
				address: "Jim Pattison Pavilion, 899 W 12th Ave",
     //number value
        postal_code: "V5Z 1M9",
        lat: "49°15'42.5\"N",
        lng: "123°07'19.4\"W",
        hospital_wait_time_morning: 2 ,
        hospital_wait_time_afternoon: 4 ,
        hospital_wait_time_night: 1.5 ,
        hospital_wait_time_after_midnight: 1 ,
        review: " ",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    hospitalRef.add({
        code: "Royal-columbian-hospital",
        name: "Royal Columbian Hospital", 
        city: "New Westminster",
        province: "BC",
				address: "330 E Columbia St",
     //number value
        postal_code: "V3L 3W7",
        lat: "49°13'36.3\"N",
        lng: "122°53'27.4\"W",
        hospital_wait_time_morning: 3 ,
        hostpital_wait_time_afternoon: 5,
        hospital_wait_time_night: 2,
        hospital_wait_time_after_midnight: 1 ,
        review: " ",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    hospitalRef.add({
        code: "Richmond-Hospital",
        name: "Richmond Hospital", //replace with your own city?
        city: "Richmond",
        province: "BC",
				address: "7000 Westminster Hwy, Richmond, BC V6X 1A2",
     //number value
        postal_code: "V6X 1A2",
        lat: " 49°10'09.1\"N",
        lng: "123°08'49.1\"W",
        hospital_wait_time_morning: 5,
        hostpital_wait_time_afternoon: 2,
        hospital_wait_time_night: 1.5,
        hospital_wait_time_after_midnight: 2,
        review: " ",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    hospitalRef.add({
        code: "Burnaby-hospital",
        name: "Burnaby Hospital",
        city: "Burnaby",
        province: "BC",
				address: "3935 Kincaid St",
     //number value
        postal_code: "V5G 2X6",
        lat: "49°15'00.7\"N",
        lng: "123°00'57.1\"W",
        hospital_wait_time_morning: 2.5 ,
        hostpital_wait_time_afternoon: 6,
        hospital_wait_time_night: 2 ,
        hospital_wait_time_after_midnight: 1 ,
        review: " ",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

}

//writeHospitals();

function writeHospital() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hospitalRef = db.collection("hospitals");

    hospitalRef.add({
        code: "Burnaby-hospital",
        name: "Burnaby Hospital",
        city: "Burnaby",
        province: "BC",
				address: "3935 Kincaid St",
     //number value
        postal_code: "V5G 2X6", 
        lat: 49.25002870562921,
        lng: -123.01580684574256,
        hospital_wait_time_morning: 2.5 ,
        hostpital_wait_time_afternoon: 6 ,
        hospital_wait_time_night: 2,
        hospital_wait_time_after_midnight: 1 ,
        review: " ",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}

//writeHospital();
