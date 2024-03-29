function displayHospitalsDynamically(collection) {

    let cardTemplate = document.getElementById("HositalCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   
        .then(allHospitals => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allHospitals.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                // var details = doc.data().details;  // get value of the "details" key
                var hospitalCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var hospitalAddress = doc.data().address; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-address').innerHTML = hospitalAddress;
                // newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-img-top').src = `./images/${hospitalCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "navigation2.html?docID="+docID;
                
                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayHospitalsDynamically("hospitals");  //input param is the name of the collection