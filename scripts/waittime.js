function displayHospitalsDynamically(collection) {
   let cardTemplate = document.getElementById("HositalCardTemplate");
   let dbQuery = db.collection(collection); // Start with the base query

   let currentTime = new Date();
   let currentHour = currentTime.getHours();
   let orderByField;

   // Determine the field to order by based on the current time
   if (currentHour >= 5 && currentHour <= 11) {
       orderByField = "hospital_wait_time_morning";
   } else if (currentHour > 11 && currentHour <= 17) {
       orderByField = "hospital_wait_time_afternoon";
   } else if (currentHour > 17 && currentHour <= 23) {
       orderByField = "hospital_wait_time_night";
   } else {
       orderByField = "hospital_wait_time_after_midnight";
   }

   // Apply orderBy based on the determined field
   dbQuery = dbQuery.orderBy(orderByField);

   dbQuery.get()
     .then(allHospitals => {
       allHospitals.forEach(doc => {
         var title = doc.data().name;
         var details = doc.data().address;
         var hospitalCode = doc.data().code;
         var lastUpdate = doc.data().last_updated.toDate(); // Convert Firestore timestamp to JavaScript Date object
         var waitTime;

         // Determine wait time based on current hour
         if (currentHour >= 5 && currentHour <= 11) {
            waitTime = doc.data().hospital_wait_time_morning;    
         } else if (currentHour > 11 && currentHour <= 17){
            waitTime = doc.data().hospital_wait_time_afternoon;
         } else if (currentHour > 17 && currentHour <= 23){
            waitTime = doc.data().hospital_wait_time_night;
         } else if (currentHour == 24 || currentHour >= 0){
            waitTime = doc.data().hospital_wait_time_after_midnight;
         }

         let newcard = cardTemplate.content.cloneNode(true);
         var docID = doc.id;
 
         newcard.querySelector('.card-title').innerHTML = title;
         newcard.querySelector('.card-time').innerHTML = waitTime <= 1 ? waitTime + " Hour" : waitTime + " Hours";

         var waitTimeColour = newcard.querySelector('.card-time');
         if (waitTime >= 0 && waitTime < 2) {
           waitTimeColour.classList.add('green');
         } else if (waitTime >= 2 && waitTime < 4) {
           waitTimeColour.classList.add('orange');
         } else {
           waitTimeColour.classList.remove('green', 'orange');
         }

         newcard.querySelector('.card-update').innerHTML = "Last Updated: " + lastUpdate.toLocaleString(); // Convert date to string format
         newcard.querySelector('.card-address').innerHTML = details;
         newcard.querySelector('.card-img-top').src = `./images/${hospitalCode}.jpg`;
         newcard.querySelector('a').href = "navigation2.html?docID=" + docID;

         document.getElementById(collection + "-go-here").appendChild(newcard);
       })
     })
     .catch(error => {
       console.error("Error getting documents: ", error);
     });
 }
 
 displayHospitalsDynamically("hospitals");
 function displayTime() {
   var currentDate = new Date();
   var hours = currentDate.getHours();
   var minutes = currentDate.getMinutes();
   var seconds = currentDate.getSeconds();
   hours = hours < 10 ? "0" + hours : hours;
   minutes = minutes < 10 ? "0" + minutes : minutes;
   seconds = seconds < 10 ? "0" + seconds : seconds;
   var timeString = "CURRENT TIME: " + hours + ":" + minutes + ":" + seconds;
   document.getElementById("clock").innerHTML = timeString;
 }
 setInterval(displayTime, 1000);
 