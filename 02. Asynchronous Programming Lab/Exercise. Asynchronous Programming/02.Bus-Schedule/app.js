function solve() {

    const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/';
    const infoBoxRef = document.querySelector("#info span");
    const departBtn = document.getElementById("depart");
    const arriveBtn = document.getElementById("arrive");

    const stopInfo = {
        name: "",
        nextStop: "depot1"
    }

    function depart() {
        // try {
        //     const response = await fetch(BASE_URL + stopInfo.nextStop);
        //     const data = await response.json();
        //     stopInfo.name = data.name;
        //     stopInfo.nextStop = data.next;
        //     infoBoxRef.textContent = `Next stop ${stopInfo.name}`;
        //     departBtn.disabled = true;
        //     arriveBtn.disabled = false;
        // } catch (error) {
        //     infoBoxRef.textContent = "Error";
        //     departBtn.disabled = true;
        //     arriveBtn.disabled = true;
        // }
        fetch(BASE_URL + stopInfo.nextStop)
            .then(res => {
            // 1. Проверка на HTTP статуса: Успешна ли е заявката?
                if (!res.ok) {
            // Ако статусът е 4xx или 5xx, хвърляме грешка, която ще бъде уловена от .catch()
                    throw new Error(`HTTP error! Status: ${res.status}`);
            }
        // 2. Връщаме Promise за парсване на JSON
                return res.json();
            })
            .then(data => {
            // 3. Обработка на успешно парсирани данни
                stopInfo.name = data.name;
                stopInfo.nextStop = data.next;
                infoBoxRef.textContent = `Next stop ${stopInfo.name}`;
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch(err => {
            // 4. Една обща обработка на всички грешки:
            //    - Мрежови грешки (няма връзка, DNS fail)
            //    - Грешки, хвърлени от `if (!res.ok)` (4xx/5xx статус)
            //    - Грешки при JSON парсирането
                infoBoxRef.textContent = "Error";
                departBtn.disabled = true;
                arriveBtn.disabled = true;
        
        // По желание: за дебъгване
        // console.error("Fetch operation failed:", err);
    });

    function arrive() {
        infoBoxRef.textContent = `Arriving at ${stopInfo.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();