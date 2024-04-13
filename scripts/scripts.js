function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("logging out user");


    window.location.href = "login.html"
  }).catch((error) => {
    console.log(error);
  });


}

document.getElementById('logout').addEventListener('click', function () {
  logout();

});