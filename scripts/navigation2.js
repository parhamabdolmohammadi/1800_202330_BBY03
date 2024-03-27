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