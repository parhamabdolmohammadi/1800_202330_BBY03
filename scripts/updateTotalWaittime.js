// function updateTime() {
//     db.collection("hospitals").get().then((allHospitals) => {
//         // updateTime();
//         // let averageAM = totalWaitTimeAM / totalReviewAM;
//         // let averagePM = totalWaitTimePM / totalReviewPM;
//         // let averageNIGHT = totalWaitTimeNIGHT / totalReviewNIGHT;
//         // let averageMidNIght = totalWaitTimeMidNight / totalReviewMidNight;

//         allHospitals.forEach((hospital) => {
//             hospital.update({

//                 totalWaitTimeAM: 0,
//                 totalWaitTimePM: 0,
//                 totalWaitTimeNIGHT: 0,
//                 totalWaitTimeMidNight: 0,
//                 totalReviewAM: 0,
//                 totalReviewPM: 0,
//                 totalReviewNIGHT: 0,
//                 totalReviewMidNight: 0,
//             });

//             hospital.collection("hospital-reviews").get().then((allReviews) => {
//                 allReviews.forEach((review) => {
//                     //check the time of the day
//                     //if AM, increment total AM reviews and sum to totalAM wait time
//                     let totalDaytime = 0;
//                     let totalReviews = 0;
//                     let average = 0;
//                     let hoursWaited = review.data().hours * 60 + review.data().minutes;
//                     switch (review.data().daytime) {
//                         case "Morning 6AM - 12PM":
//                             totalReviews = hospital.data().totalReviewAM + 1;
//                             totalDaytime = hospital.data().totalWaitTimeAM + hoursWaited;
//                             average = totalDaytime / totalReviews;
//                             hospital.update({
//                                 totalWaitTimeAM: totalDaytime,
//                                 totalReviewAM: totalReviews,
//                                 hospital_wait_time_morning: average
//                             })
//                             break;
//                         case "Afternoon 12PM - 6PM":
//                             totalReviews = hospital.data().totalWaitTimePM + 1;
//                             totalDaytime = hospital.data().totalWaitTimePM + hoursWaited;
//                             average = totalDaytime / totalReviews;
//                             hospital.update({
//                                 totalWaitTimePM: totalDaytime,
//                                 totalReviewPM: totalReviews,
//                                 hospital_wait_time_afternoon: average
//                             })
//                             break;
//                         case "Night 6PM - 12AM":
//                             totalReviews = hospital.data().totalReviewNIGHT + 1;
//                             totalDaytime = hospital.data().totalWaitTimeNIGHT + hoursWaited;
//                             average = totalDaytime / totalReviews;
//                             hospital.update({
//                                 totalWaitTimeNIGHT: totalDaytime,
//                                 totalReviewNIGHT: totalReviews,
//                                 hospital_wait_time_night: average
//                             })
//                             break;
//                         case "Midnight 12AM - 6AM":

//                             totalReviews = hospital.data().totalReviewMidNight + 1;
//                             totalDaytime = hospital.data().totalReviewMidNight + hoursWaited;
//                             average = totalDaytime / totalReviews;
//                             hospital.update({
//                                 totalWaitTimeMidNight: totalDaytime,
//                                 totalReviewMidNight: totalReviews,
//                                 hospital_wait_time_after_midnight: average
//                             })
//                             break;
//                         default:
//                             break;
//                     }
                    
//                 })
//             });

//         })



//         allHospitals.forEach((doc) => {
//             doc.update({
//                 hospital_wait_time_morning: averageAM,
//                 hospital_wait_time_afternoon: averagePM,
//                 hospital_wait_time_night: averageNIGHT,
//                 hospital_wait_time_after_midnight: averageMidNIght,
//                 totalWaitTimeAM: 0,
//                 totalWaitTimePM: 0,
//                 totalWaitTimeNIGHT: 0,
//                 totalWaitTimeMidNight: 0,
//                 totalReviewAM: 0,
//                 totalReviewPM: 0,
//                 totalReviewNIGHT: 0,
//                 totalReviewMidNight: 0,
//             });
//         })
//     });




// }

function updateTime() {
    console.log("here")
    db.collection("hospitals").get().then((allHospitals) => {
        console.log("here 1", allHospitals.docs)

        allHospitals.docs.forEach((hospitalDoc) => {
            console.log(hospitalDoc)
            const hospitalData = hospitalDoc.data();
            let totalWaitTimeAM = 0, totalWaitTimePM = 0, totalWaitTimeNIGHT = 0, totalWaitTimeMidNight = 0;
            let totalReviewAM = 0, totalReviewPM = 0, totalReviewNIGHT = 0, totalReviewMidNight = 0;

            db.collection("hospitals").doc(hospitalData.id).collection("hospitals-reviews").get().then((allReviews) => {
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

                // console.log(totalWaitTimeAM,
                //     totalWaitTimePM,
                //     totalWaitTimeNIGHT,
                //     totalWaitTimeMidNight,
                //     totalReviewAM,
                //     totalReviewPM,
                //     totalReviewNIGHT,
                //     totalReviewMidNight,);

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

                hospitalDoc.ref.update(updateObj).then(() => {
                    // Optional: You can do something after the update finishes
                    console.log("DONE")
                }).catch((error) => {
                    console.error("Error updating hospital: ", error);
                });
            });
        });
    }).catch((error) => {
        console.error("Error updating hospital: ", error);
    });
}
