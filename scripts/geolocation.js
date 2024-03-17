let map, lat, lng, hospID;

getId("hospitals");
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Browser doesn't support geolocation.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    initMap();

    console.log(hospID);
    db.collection("hospitals").doc(hospID).onSnapshot(snap => {
        let d = distance(snap.data().lat, snap.data().lng);
        document.getElementById("display-loc").innerHTML = d + " km from Vancouver General Hospital";
    });
}

async function initMap() {
    const position = { lat: lat, lng: lng };
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 14,
        center: position,
        mapId: "map",
    });

    const marker = new AdvancedMarkerView({
        map: map,
        position: position,
        title: "You",
    });
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

function distance(latHosp, lngHosp) {
    var R = 6371; // Radius of the earth in km
    var dLat = toRad(lat - latHosp);  // Javascript functions in radians
    var dLon = toRad(lng - lngHosp);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) * Math.cos(toRad(latHosp)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function getId(collection) {
    db.collection(collection).get()
        .then(allHospitals => {
            allHospitals.forEach(doc => {
                let title = doc.data().name;
                if (title == "Vancouver General Hospital") {
                    hospID = doc.id;
                    console.log("ID updated")
                }
            })
        });
}

