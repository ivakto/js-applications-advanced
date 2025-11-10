function login() {
    const URL = "http://localhost:3030/users/login";
    document.querySelector("form").addEventListener("submit", onSubmit);

    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            alert("Error!");
            return;
        }

        onLogin({email, password});
    }
    async function onLogin(data) {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(URL, option);
        if(response.status !== 200) {
            return;
        }

        const data = await response.json();

        sessionStorage.setItem("userData", JSON.stringify(data));
        window.location = "index.html";
    }
}

login();