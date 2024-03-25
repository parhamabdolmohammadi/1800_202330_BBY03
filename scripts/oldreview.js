var submit = document.getElementById('reviewForm');
var textarea = document.getElementById('reviewInput');
var docRef = null;   //this is the id of the hospital, change it to ID variable later
let hospID = null;

//Marcus: i was trying to grab the values of each hospital so it could be used
var itemName = null;
var itemAddress = null;
var itemCity = null;
var itemCode = null;
var itemMidTime = null;
var itemMornTime = null;
var itemNightTime = null;
var itemAftTime = null;
var itemUpd = null;
var itemLat = null;
var itemLng = null;


//Marcus: this should be edited so it can be used to display for all hospitals instead of only one hospital
function getId(collection){
    db.collection(collection).get()
        .then(allHospitals => {
            allHospitals.forEach(doc => {
                let title = doc.data().name;
                if (title == "Vancouver General Hospital" ) {
                    hospID = doc.id;
                    console.log("ID updated")
                }
            })
        });
}

getId("hospitals");

console.log(hospId);
//Marcus: this was me trying to get the values of each hospital so they could be used later, the value of the
//variables only work inside the function for some reason
function getData() {
    db.collection("hospitals").doc(hospID).onSnapshot(snap => {
        console.log(snap.data());
        itemName = snap.data().name;
        itemAddress = snap.data().address;
        itemCity = snap.data().city;
        itemCode = snap.data().code;
        itemMidTime = snap.data().hospital_wait_time_after_midnight;
        itemMornTime = snap.data().hospital_wait_time_morning;
        itemNightTime = snap.data().hospital_wait_time_night;
        itemAftTime = snap.data().hospital_wait_time_afternoon;
        itemUpd = snap.data().last_updated;
        itemLat = snap.data().lat;
        itemLng = snap.data().lng;

        console.log(itemMidTime, itemAftTime, itemMornTime, itemNightTime);
    });
}


//Marcus: function for updating the review segment of the hospital, I will try to change it so the review is attached to the user too
function addReview(itemReview) {
    getData();

    db.collection("hospitals").doc(hospID).update({
        review : itemReview
    });
}

//Marcus: clicker event so the hospital database could receive a review from the customer
submit.addEventListener("click", function () {
    let hospReview = textarea.value.trim();
    
    console.log(hospReview);
    
    docRef = db.collection("hospital").doc(hospID);
    console.log(getData());

    if(hospReview!=='') {
        addReview(hospReview);
    }

    textarea.value = "";
    textarea.setAttribute("placeholder","Thank you for your review.");
    textarea.setAttribute("readonly","readonly");
    submit.setAttribute("disabled", "disabled");
});

