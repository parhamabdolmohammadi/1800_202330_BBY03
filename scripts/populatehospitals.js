/// ha


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
        hospital_wait_time_afternoon: 5,
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
        hospital_wait_time_afternoon: 2,
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
        hospital_wait_time_afternoon: 6,
        hospital_wait_time_night: 2 ,
        hospital_wait_time_after_midnight: 1 ,
        review: " ",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

}

//writeHospitals();

function writeNewHospital() {
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
        lat: 49.249777803582894, 
        lng: -123.01590269677597,
        hospital_wait_time_morning: 2.5 ,
        hospital_wait_time_afternoon: 6,
        hospital_wait_time_night: 2 ,
        hospital_wait_time_after_midnight: 1 ,
        phone: 16044344211,
        website: "https://www.fraserhealth.ca/Service-Directory/Locations/Burnaby/burnaby-hospital#.X85wSchKhaQ",
        review: " ",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}

//writeHospital();












function writeNewHospitals() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hospitalRef = db.collection("hospitals");

    hospitalRef.add({
        code: "lionsgate",
        name: "Lions Gate Hospital",
        city: "North Vancouver",
        province: "BC",
				address: "231 15th St E, North Vancouver, BC V7L2L7",
     //number value
        postal_code: "V7L2L7", 
        lat:  49.320946532391616, 
        lng: -123.06843290401066,
        hospital_wait_time_morning: 2 ,
        hospital_wait_time_afternoon: 6 ,
        hospital_wait_time_night: 1,
        hospital_wait_time_after_midnight: 2.5 ,
        phone: 16049883131,
        website: "https://www.google.ca/url?url=https%3A%2F%2Fwww.vch.ca%2Fen%2Flocation%2Flions-gate-hospital&sa=t&rct=j&source=maps&usg=AOvVaw10B7yGvomCtonAV1TMq7zz&ved=1i%3A17%2Ct%3A3443%2Ce%3A13%2Cp%3AeVwLZppBmqnQ8Q-F1bSIDw%3A269",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    

    hospitalRef.add({
        code: "eagleridge",
        name: "Eagle Ridge Hospital",
        city: "Port Moody",
        province: "BC",
				address: "475 Guildford Way, Port Moody, BC V3H 3W9",
     //number value
        postal_code: "V3H 3W9", 
        lat:  49.285725566239165,  
        lng: -122.82359934761527,
        hospital_wait_time_morning: 2 ,
        hospital_wait_time_afternoon: 3.5 ,
        hospital_wait_time_night: 6,
        hospital_wait_time_after_midnight: 1 ,
        phone: 16044612022,
        website: "https://www.fraserhealth.ca/Service-Directory/Locations/Port-Moody/eagle-ridge-hospital#.XSqzNyUTGEc",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    

    hospitalRef.add({
        code: "stpaul",
        name: "St. Paul's Hospital",
        city: "Vancouver",
        province: "BC",
				address: "1081 Burrard St, Vancouver, BC V6Z 1Y6",
     //number value
        postal_code: "V6Z 1Y6", 
        lat:  49.28065517120346,   
        lng: -123.12801233009844,
        hospital_wait_time_morning: 2.5 ,
        hospital_wait_time_afternoon: 3 ,
        hospital_wait_time_night: 2,
        hospital_wait_time_after_midnight: 5 ,
        phone: 16048069090,
        website: "https://www.providencehealthcare.org/en/locations/st-pauls-hospital",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    hospitalRef.add({
        code: "Mount Saint Joseph Hospital",
        name: "Mount Saint Joseph Hospital",
        city: "Vancouver",
        province: "BC",
				address: "3080 Prince Edward St, Vancouver, BC V5T 3N4",
     //number value
        postal_code: "V5T 3N4", 
        lat:  49.25789928064288,  
        lng: -123.09530443721424,
        hospital_wait_time_morning: 1 ,
        hospital_wait_time_afternoon: 3.5 ,
        hospital_wait_time_night: 2.5,
        hospital_wait_time_after_midnight: 1 ,
        phone: 16048741141,
        website: "https://www.providencehealthcare.org/en/locations/mount-saint-joseph-hospital",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    hospitalRef.add({
        code: "Surrey Memorial Hospital",
        name: "Surrey Memorial Hospital",
        city: "Surrey",
        province: "BC",
				address: "13750 96 Ave, Surrey, BC V3V 1Z2",
     //number value
        postal_code: "V3V 1Z2", 
        lat:  49.17642070259594,  
        lng: -122.8425221205638,
        hospital_wait_time_morning: 2 ,
        hospital_wait_time_afternoon: 6 ,
        hospital_wait_time_night: 5,
        hospital_wait_time_after_midnight: 1.5 ,
        phone: 16045812211,
        website: "https://www.fraserhealth.ca/Service-Directory/Locations/Surrey/surrey-memorial-hospital",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    hospitalRef.add({
        code: "Delta Hospital",
        name: "Delta Hospital",
        city: "Delta",
        province: "BC",
				address: "5800 Mountain View Blvd, Delta, BC V4K 3V6",
     //number value
        postal_code: "V4K 3V6", 
        lat:  49.085362724916706,  
        lng: -123.06156566915878,
        hospital_wait_time_morning: 1 ,
        hospital_wait_time_afternoon: 3,
        hospital_wait_time_night:2,
        hospital_wait_time_after_midnight: 7 ,
        phone: 16049461121,
        website: "https://www.google.ca/url?url=http%3A%2F%2Fdeltahospitalauxiliary.org%2F&sa=t&rct=j&source=maps&usg=AOvVaw1dJPR8kxz6QwVwfDqrdAcG&ved=1i%3A19%2Ct%3A3443%2Ce%3A13%2Cp%3AeVwLZppBmqnQ8Q-F1bSIDw%3A504",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    hospitalRef.add({
        code: "Peace Arch Hospital",
        name: "Peace Arch Hospital",
        city: "White Rock",
        province: "BC",
				address: "15521 Russell Ave, White Rock, BC V4B 5M2",
     //number value
        postal_code: "V4B 5M2", 
        lat:  49.03011376156027,  
        lng: -122.79226350712236,
        hospital_wait_time_morning: 1.5 ,
        hospital_wait_time_afternoon: 5,
        hospital_wait_time_night:4,
        hospital_wait_time_after_midnight: 2,
        phone: 16045315512,
        website: "https://www.peacearchmaternityclinic.ca/",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    hospitalRef.add({
        code: "Ridge Meadows Hospital",
        name: "Ridge Meadows Hospital",
        city: "Maple Ridge",
        province: "BC",
				address: "11666 Laity St, Maple Ridge, BC V2X 7G5",
     //number value
        postal_code: "V2X 7G5", 
        lat:  49.21558435123923,  
        lng:  -122.63002943272403,
        hospital_wait_time_morning: 7 ,
        hospital_wait_time_afternoon: 1.5,
        hospital_wait_time_night:1,
        hospital_wait_time_after_midnight: 7,
        phone: 16044634111,
        website: "https://www.fraserhealth.ca/",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    hospitalRef.add({
        code: "Langley Memorial Hospital",
        name: "Langley Memorial Hospital",
        city: "Langley",
        province: "BC",
				address: "22051 Fraser Hwy, Langley Twp, BC V3A 4H4",
     //number value
        postal_code: "V3A 4H4", 
        lat:  49.09557663382757,  
        lng:  -122.61238661486608,
        hospital_wait_time_morning: 2 ,
        hospital_wait_time_afternoon: 5,
        hospital_wait_time_night:6,
        hospital_wait_time_after_midnight: 1.5,
        phone: 16045146000,
        website: "https://www.fraserhealth.ca/Service-Directory/Locations/Langley/langley-memorial-hospital",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    hospitalRef.add({
        code: "Mission Memorial Hospital",
        name: "Mission Memorial Hospital",
        city: "Mission",
        province: "BC",
				address: "7324 Hurd St, Mission, BC V2V 3H5",
     //number value
        postal_code: "V2V 3H5", 
        lat:  49.143586574792316,    
        lng:  -122.33165765906334,
        hospital_wait_time_morning: 4,
        hospital_wait_time_afternoon: 7,
        hospital_wait_time_night:3,
        hospital_wait_time_after_midnight: 4.5,
        phone: 16048266261,
        website: "https://www.fraserhealth.ca/Service-Directory/Locations/Mission/mission-memorial-hospital",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    hospitalRef.add({
        code: "Abbotsford Regional Hospital and Cancer Centre",
        name: "Abbotsford Regional Hospital and Cancer Centre",
        city: "Abbotsford",
        province: "BC",
				address: "32900 Marshall Rd, Abbotsford, BC V2S 0C2",
     //number value
        postal_code: "V2S 0C2", 
        lat:  49.03737635465022,  
        lng: -122.3128738896342,
        hospital_wait_time_morning: 3.5,
        hospital_wait_time_afternoon: 1,
        hospital_wait_time_night:3,
        hospital_wait_time_after_midnight: 8.5,
        phone: 16048514700,
        website: "https://www.fraserhealth.ca/service-directory/locations/abbotsford/abbotsford-regional-hospital-and-cancer-centre",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    hospitalRef.add({
        code: "Chilliwack General Hospital",
        name: "Chilliwack General Hospital",
        city: "Chilliwack",
        province: "BC",
				address: "45600 Menholm Rd, Chilliwack, BC V2P 1P7",
     //number value
        postal_code: "V2P 1P7", 
        lat:  49.167027348478996,   
        lng:  -121.96312638130215,
        hospital_wait_time_morning: 2.5,
        hospital_wait_time_afternoon: 5.5,
        hospital_wait_time_night:1,
        hospital_wait_time_after_midnight: 2,
        phone: 16047954141,
        website: "https://www.bing.com/search?q=Chilliwack+General+Hospital&cvid=3c653d6d61d841f7995d0b5b0ca02a5c&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBBFGDzSAQc5NzlqMGo5qAIEsAIB&FORM=ANAB01&PC=HCTS",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    
    hospitalRef.add({
        code: "Sunny Hill Health Centre",
        name: "Sunny Hill Health Centre",
        city: "Vancouver",
        province: "BC",
				address: "4480 Oak St, Vancouver, BC V6H 3N1",
     //number value
        postal_code: "V6H 3N1", 
        lat:  49.244376834820784,    
        lng:  -123.12588307700322,
        hospital_wait_time_morning: 5,
        hospital_wait_time_afternoon: 3,
        hospital_wait_time_night:7.5,
        hospital_wait_time_after_midnight: 4.5,
        phone: 16048752345,
        website: "http://www.bcchildrens.ca/our-services/sunny-hill-health-centre/",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    

}