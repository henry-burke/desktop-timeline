const adminLogin = () => {
    document.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            validate(e);
        }
    });
}

const validate = () => {
    let attempt = document.querySelector(".admin-password");
    console.log(attempt.innerHTML);
    if (attempt === "password") {
        runAdminConsole();
    }
}

const runAdminConsole = () => {
    console.log("Hi Admin!");
}

adminLogin();