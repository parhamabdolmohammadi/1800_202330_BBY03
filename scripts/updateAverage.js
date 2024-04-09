function updateAverage() {
    db.collection("hospitals").get().then((allHospitals) => {
        allHospitals.forEach((hospitalDoc) => {
            const hospitalData = hospitalDoc.data();

            let averageHoursAM, averageHoursPM, averageHoursNIGHT, averageHoursMidNight;

            if (hospitalData.totalReviewAM == 0 || isNaN(hospitalData.totalWaitTimeAM))
                averageHoursAM = hospitalData.hospital_wait_time_morning;
            else
                averageHoursAM = round((hospitalData.totalWaitTimeAM / hospitalData.totalReviewAM) / 60);

            if (hospitalData.totalReviewPM == 0 || isNaN(hospitalData.totalWaitTimePM))
                averageHoursPM = hospitalData.hospital_wait_time_afternoon;
            else
                averageHoursPM = round((hospitalData.totalWaitTimePM / hospitalData.totalReviewPM) / 60);

            if (hospitalData.totalReviewNIGHT == 0 || isNaN(hospitalData.totalWaitTimeNIGHT))
                averageHoursNIGHT = hospitalData.hospital_wait_time_night;
            else
                averageHoursNIGHT = round((hospitalData.totalWaitTimeNIGHT / hospitalData.totalReviewNIGHT) / 60);

            if (hospitalData.totalReviewMidNight == 0 || isNaN(hospitalData.totalWaitTimeMidNight))
                averageHoursMidNight = hospitalData.hospital_wait_time_after_midnight;
            else
                averageHoursMidNight = round((hospitalData.totalWaitTimeMidNight / hospitalData.totalReviewMidNight) / 60);

            let average = {
                hospital_wait_time_after_midnight: averageHoursMidNight,
                hospital_wait_time_afternoon: averageHoursPM,
                hospital_wait_time_morning: averageHoursAM,
                hospital_wait_time_night: averageHoursNIGHT
            };

            db.collection("hospitals").doc(hospitalDoc.id).update(average).then(console.log("DDA-BONG / ALL GOOD"));

        });
    });
}

function round(num) {
    return Math.round(num * 10) / 10;
}