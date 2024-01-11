const loginPostHandler = async (event) => {
    event.preventDefault();
    console.log("PROCESSING FORM");
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
        console.log(stringUser);
        const responseData = await fetch('/api/users/login', {
            method: 'POST',
            body: stringUser,
            headers: {'Content-Type': 'application/json'},
        });

        if (responseData.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        } else {
            alert(responseData.statusText);
        }
    }
};

document.getElementById("login-form").addEventListener('submit', loginPostHandler);