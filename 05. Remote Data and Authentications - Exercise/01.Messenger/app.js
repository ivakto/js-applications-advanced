function attachEvents() {
    
    const BASE_URL = "http://localhost:3030/jsonstore/messenger";
    const textArea = document.getElementById("messages");
    const submitButton = document.getElementById("submit"); 
    const refreshButton = document.getElementById("refresh"); 

    const authorRef = document.querySelector("input[name='author']");
    const contentRef = document.querySelector("input[name='content']");
    onLoad();

    submitButton.addEventListener("click", onSubmit);
    refreshButton.addEventListener("click", onLoad);

    async function onSubmit(event) {
        const author = authorRef.value;
        const content = contentRef.value;

        if (!author || !content) {
            return;
        }

        const data = {
            author,
            content
        }

        const option = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }
        await fetch(BASE_URL, option);
        authorRef.value = "";
        contentRef.value = "";

        onLoad();
    }

    async function onLoad(event) {
        const responce = await fetch(BASE_URL);
        if (responce.status !== 200) {
            return;
        }
        const data = await responce.json();   

        let buff = "";
        Object.values(data).forEach(({author, content}) => {
            buff += `${author}: ${content}\n`;
        });

        textArea.value = buff.trim();
    }
}

attachEvents();