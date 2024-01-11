const signUpPostHandler = async (event) => {
    event.preventDefault();

    const userEmail = document.getElementById('user_id').value;
    const userPW = document.getElementById('user_password').value;
    //make sure neither are null or whitespace
    if (userEmail.trim() && userPW.trim()) {
        //create JSON user object that represents the model
        const newUser = {
            username: userEmail,
            password: userPW
        }
        //stringify it for the request
        const stringUser = JSON.stringify(newUser);
        console.log("NEW USER");
        console.log(stringUser);
        const responseData = await fetch('/api/users/', {
            method: 'POST',
            body: stringUser,
            headers: {'Content-Type': 'application/json'},
        })

        if (responseData.ok) {
            document.location.replace('/');
        } else {
            alert(responseData.statusText);
        }
    }
}



document.getElementById("sign-up-form").addEventListener('submit', signUpPostHandler);

