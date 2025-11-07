async function lockedProfile() {
    
    const BASE_URL = "http://localhost:3030/jsonstore/advanced/profiles";
    // Response е само обвивка около реалния отговор на сървъра.
    // Съдържа метаданни на заявката, като например статус, заглавие и др.
    const response = await fetch(BASE_URL);
    // JSON чете целия поток и парсва от JSON формат в готов за използване JavaScript обект
    const data = await response.json();

    // Стъпка 2: Създаване и показване на потребителските профили
    // Изчистване на шаблона: Трябва да изтрием този шаблон профил от DOM (за да не се дублира), 
    // но преди това да запазим самия <div class="profile"> като шаблон, който ще клонираме.
    // Итериране: Да преминем през обекта с данни (data), който току-що изтеглихме.
    //Генериране: За всеки потребител в data да създадем нов профил, използвайки запазения шаблон, и да попълним данните.

    // Контейнер, в който добавяме всички генерирани файлове
    const main = document.getElementById("main");
    // Взима референция към първия HTML елемент с клас profile. 
    // Този елемент служи за шаблон (template) за всеки нов профил.
    const profileTemplete = document.getElementsByClassName("profile")[0];
    main.innerHTML = "";

    // Извлича само стойностите на този обект, и ги поставя в масив 
    const profiles = Object.values(data);

    profiles.forEach(user => {
        // Създава точно копие на елемента-шаблон (profileTemplete). 
        // Аргументът true е критичен – той указва, че трябва да се направи дълбоко клониране (deep clone), 
        // което означава, че се копират и всичките му дъщерни елементи (като input полетата).
        const userProfile = profileTemplete.cloneNode(true);

        // Намира всички <input> елементи в клонирания профил (userProfile).
        const profileInputs = userProfile.querySelectorAll('input'); 
        profileInputs.forEach(input => {
            const oldName = input.name; 
            if (oldName) {
                input.name = oldName.replace('user1', `user${user.id}`); 
            }
        });
        // Тук се попълват стойностите (value) на конкретни input полета с данните от текущия потребител (user).
        profileInputs[2].value = user.username;
        profileInputs[3].value = user.email;
        profileInputs[4].value = user.age;

        // Намиране на бутона
        const button = userProfile.querySelector('button');
        button.addEventListener('click', onToggle);

    main.appendChild(userProfile);

    });

    // Стъпка 3 - Имплементиране на функционалността "Show more" / "Hide it"
    const hiddenInfoDiv = userProfile.querySelector('.user1Username');
    hiddenInfoDiv.style.display = 'none';

}

function onToggle(e) {
    
}