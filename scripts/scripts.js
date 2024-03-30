function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");


        window.location.href = "login.html"
      }).catch((error) => {
        // An error happened.
      });

      
}

document.getElementById('logout').addEventListener('click', function() {



logout();


});