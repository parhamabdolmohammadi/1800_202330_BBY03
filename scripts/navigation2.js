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
            
            // only populate title, and image
            document.getElementById( "hopital_name" ).innerHTML = hospitalName;
            let imgEvent = document.getElementById("hospital_image");
            imgEvent.src = "./images/" + hospitalCode + ".jpg";
            document.getElementById("hospital_anchor").href = "navigaton3.html?docID=" + ID;
                
        } );
}

displayHospitalInfo();

function callAlert() {
    let params = new URL(window.location.href); 
    let ID = params.searchParams.get("docID"); 
    
    db.collection("hospitals")
        .doc(ID)
        .get()
        .then(doc => {
            let hospitalphone = "+" + doc.data().phone;
            
            Swal.fire({
                title: "Phone",
                text: hospitalphone
            });
        })
        .catch(error => {
            console.error("Error getting hospital data:", error);
        });
}


function displayHospitalWebsite() {
    let params = new URL( window.location.href ); 
    let ID = params.searchParams.get( "docID" ); 

    db.collection( "hospitals" )
    .doc( ID )
    .get()
    .then( doc => {
        hospitalWebsite = doc.data().website;
        document.querySelector("#hospital_website").href = hospitalWebsite;
            
    } );

}

function getHospitalAvaliability() {
    let params = new URL( window.location.href ); 
    let ID = params.searchParams.get( "docID" ); 

    db.collection( "hospitals" )
    .doc( ID )
    .get()
    .then( doc => {
        hospital_wait_time_after_midnight = doc.data().hospital_wait_time_after_midnight;
        hospital_wait_time_afternoon = doc.data().hospital_wait_time_afternoon;
        hospital_wait_time_morning = doc.data().hospital_wait_time_morning;
        hospital_wait_time_night = doc.data().hospital_wait_time_night;

         text = "Mrning: " + hospital_wait_time_morning + "\t" +
        "Afternoon: " + hospital_wait_time_afternoon + "\t" +
        "Night: " + hospital_wait_time_night + "\t" +
        "After Midnight: " + hospital_wait_time_after_midnight;

 

        Swal.fire({
            title: "Wait Time",
            text: text,
            
          });
       
    } );
}


function displayWatiTime()  {
    let params = new URL( window.location.href ); 
    let ID = params.searchParams.get( "docID" ); 

    db.collection( "hospitals" )
    .doc( ID )
    .get()
    .then( doc => {
        let waitTime;
        let currentTime = new Date();
        
        if (currentTime.getHours() >= 5 && currentTime.getHours() <= 11) {
            waitTime = doc.data().hospital_wait_time_morning;
        } else if (currentTime.getHours() > 11 && currentTime.getHours() <= 17) {
            waitTime = doc.data().hospital_wait_time_afternoon;
        } else if (currentTime.getHours() > 17 && currentTime.getHours() <= 23) {
            waitTime = doc.data().hospital_wait_time_night;
        } else if (currentTime.getHours() === 0) { 
            waitTime = doc.data().hospital_wait_time_after_midnight;
        }

         text = "Current Wait Time: " + waitTime;
        console.log(waitTime);

         Swal.fire({
            title: "Wait Time",
            text: text,
            
          });
       
    } );

}

function ShareLocation() {
    let params = new URL(window.location.href); 
    let ID = params.searchParams.get("docID"); 
    
    db.collection("hospitals")
        .doc(ID)
        .get()
        .then(doc => {
            let lat = doc.data().lat;
            let lng = doc.data().lng;
          
            let text = `https://www.google.com/maps?q=${lat},${lng}`;

            Swal.fire({
                title: "Share The Location",
                input: "text",
                inputValue: text,
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
            });
        })
        .catch(error => {
            console.error("Error getting document:", error);
        });
}



