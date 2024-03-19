function readTimeNW(id) {
    db.collection("quotes").doc(id)                                                      //name of the collection and documents should matach excatly with what I have in Firestore
      .onSnapshot(idDoc => {                                                               //arrow notation
           console.log("current time data: " + idDoc.data());                          //.data() returns data object
      })
}
readTimeNW("FdbvfQwFmYyugTGpbgQc");        //calling the function

function readTimeVGH(id) {
    db.collection("quotes").doc(id)                                                      //name of the collection and documents should matach excatly with what I have in Firestore
      .onSnapshot(idDoc => {                                                               //arrow notation
           console.log("current time data: " + idDoc.data());                          //.data() returns data object
      })
}
readTimeVGH("G2yHk50SycGPcyd2ZR3M");        //calling the function

function readTimeBUR(id) {
    db.collection("quotes").doc(id)                                                      //name of the collection and documents should matach excatly with what I have in Firestore
      .onSnapshot(idDoc => {                                                               //arrow notation
           console.log("current time data: " + idDoc.data());                          //.data() returns data object
      })
}
readBUR("LcOuad5poxGgwFB8KKbn");        //calling the function

//Getting all documents from one collection in Firestore
function getAllItems() {
    db.collection("hospitals")
      .get()
      .then((allitems) => {
        const sales_item = allitems.docs.map((doc) => doc.data());
        console.log(sales_item);
      });
  }
  getAllItems();