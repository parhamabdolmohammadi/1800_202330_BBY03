function updateTime() {
    console.log("here")
    db.collection("hospitals").get().then((allHospitals) => {
        // console.log("here 1", allHospitals)

        allHospitals.forEach((hospitalDoc) => {
            // console.log(hospitalDoc)
            const hospitalData = hospitalDoc.data();
            let totalWaitTimeAM = 0, totalWaitTimePM = 0, totalWaitTimeNIGHT = 0, totalWaitTimeMidNight = 0;
            let totalReviewAM = 0, totalReviewPM = 0, totalReviewNIGHT = 0, totalReviewMidNight = 0;

            db.collection("hospitals").doc(hospitalDoc.id).collection("hospitals-reviews").get().then((allReviews) => {
                allReviews.forEach((review) => {
                    
                    let hoursWaited = review.data().hours * 60 + review.data().minutes;
                    console.log(hoursWaited)
                    switch (review.data().daytime) {
                        case "Morning 6AM - 12PM":
                            totalReviewAM++;
                            totalWaitTimeAM += hoursWaited;
                            console.log(totalWaitTimeAM)
                            break;
                        case "Afternoon 12PM - 6PM":
                            totalReviewPM++;
                            totalWaitTimePM += hoursWaited;
                            console.log(totalWaitTimePM)
                            break;
                        case "Night 6PM - 12AM":
                            totalReviewNIGHT++;
                            totalWaitTimeNIGHT += hoursWaited;
                            console.log(totalWaitTimeNIGHT)
                            break;
                        case "Midnight 12AM - 6AM":
                            totalReviewMidNight++;
                            totalWaitTimeMidNight += hoursWaited;
                            console.log(totalWaitTimeMidNight)
                            break;
                        default:
                            break;
                    }
                });

                let updateObj = {
                    totalWaitTimeAM,
                    totalWaitTimePM,
                    totalWaitTimeNIGHT,
                    totalWaitTimeMidNight,
                    totalReviewAM,
                    totalReviewPM,
                    totalReviewNIGHT,
                    totalReviewMidNight,
                };

                console.log(updateObj);

                db.collection("hospitals").doc(hospitalDoc.id).update(updateObj).then(() => {
                    updateAverage();
                    // Optional: You can do something after the update finishes
                    console.log("Review done");
                }).catch((error) => {
                    console.error("Error updating hospital: ", error);
                });
            });
        });
    }).catch((error) => {
        console.error("Error updating hospital: ", error);
    });
}
