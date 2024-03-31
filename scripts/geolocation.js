let map, lat, lng, hospID;
var closest = 100, closestID;

getId("hospitals");
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Browser doesn't support geolocation.");
    }
}

async function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    db.collection("hospitals").get().then((allHospitals) => {
        allHospitals.forEach((doc) => {
            let d = distance(doc.data().lat, doc.data().lng);
            if (d < closest) {
                closest = d;
                closestID = doc.data().name;
            }
        });
        document.getElementById("display-loc").innerHTML = "The closest hospital is " + closestID + ", " +
            closest.toFixed(2) + " km";
    });

    await initMap();

}

async function initMap() {
    // The location of Uluru
    const position = { lat: lat, lng: lng };
    // Request needed libraries.
    //@ts-ignore
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
        zoom: 12,
        center: position,
        mapId: "map",
    });

    let marker;

    db.collection("hospitals").get().then((allHospitals) => {
        allHospitals.forEach((doc) => {
            const priceTag = document.createElement("div");
                priceTag.className = "price-tag";
                priceTag.textContent = doc.data().name + ": " + doc.data().hospital_wait_time_morning;

            marker = new AdvancedMarkerElement({
                map: map,
                position: { lat: doc.data().lat, lng: doc.data().lng },
                title: doc.data().name,
                content: priceTag,
                gmpClickable: true,
            });

            if (doc.data().name == closestID) {
                // const pinClose = new PinElement({
                //     background: "#FBBC04",
                //     borderColor: "#FFBC04"
                // });
                priceTag.setAttribute("style", "background-color: #e14242; border-top: 8px solid #e14242;")
                marker.content = priceTag;
                
            }

            marker.addListener("click", () => {
                window.location.href = "navigaton3.html?docID=" + doc.id;
            });
        });
    });

    const pinUser = new PinElement({
        background: "#FFFFFF",
    });

    // The marker, positioned at Uluru
    marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "You",
        gmpClickable: true,
        content: pinUser.element,
    });
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

function getId(collection) {
    db.collection(collection).get()
        .then(allHospitals => {
            allHospitals.forEach(doc => {
                let title = doc.data().name;
                if (title == "Vancouver General Hospital") {
                    hospID = doc.id;
                    console.log("ID updated");
                }
            })
        });
}

