function attachEvents() {
    
    const BASE_URL = "http://localhost:3030/jsonstore/phonebook";

    const phoneBookUL = document.getElementById("phonebook");
    const personRef = document.getElementById("person");
    const phoneRef = document.getElementById("phone");

    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById("btnCreate").addEventListener("click", onCreate);
    
    async function onLoad(event) {

        const responce = await fetch(BASE_URL);

        if (responce.status !== 200) {
            return;
        }

        const data = await responce.json();
        phoneBookUL.innerHTML = "";
        Object.values(data).forEach( rec => createRecord(rec));
    }

    async function onCreate(event) {
        const person = personRef.value;
        const phone = phoneRef.value;

        if (!person || !phone) {
            return;
        }

        const data = {
            person,
            phone
        }

        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        }

        personRef.value = "";
        phoneRef.value = "";


        await fetch(BASE_URL, option);
        onLoad();
    }

    function createRecord(data) {
        const li = document.createElement("li");
        li.textContent = `${data.person}: ${data.phone}`;
        phoneBookUL.append(li);
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.addEventListener("click", onDelete);
        li.appendChild(button);
        li.dataset.id = data._id;

        phoneBookUL.appendChild(li);
    }

    async function onDelete(e) {
        const id = e.target.parentElement.dataset.id;

        await fetch(BASE_URL + "/" + id, {method: "DELETE"})  ;
        onLoad();
    }
}

attachEvents();