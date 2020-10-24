// auth tracking
auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user);
    } else {
        setupUI();
    }
})

// logout method
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login method
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var customErrorMessage = 'default';
        if(errorCode === "auth/wrong-password")
        {
            customErrorMessage = "Incorrect Password. Please try again.";
        }
        else if(errorCode === "auth/user-not-found")
        {
            customErrorMessage = "Incorrect Email. Please try again.";
        }
        else if(errorCode === "auth/too-many-requests")
        {
            customErrorMessage = "Too many failed login attempts. Please try again later";
        }
        else if(customErrorMessage = 'default')
        {
        customErrorMessage = "firebase: " + errorMessage;
        }
        document.getElementById('feedback').innerHTML = customErrorMessage;
    });

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred.user);
    });
});
