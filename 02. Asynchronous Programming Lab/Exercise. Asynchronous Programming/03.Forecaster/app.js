function attachEvents() {
    document.getElementById('submit').addEventListener('click', onSubmit);
    const locationRef = document.getElementById("location");
    const forecastRef = document.getElementById("forecast");
    const current = document.getElementById("current");
    const upcoming = document.getElementById("upcoming");
    
    const BASE_URL = "http://localhost:3030/jsonstore/forecaster/";

    const endpoints = {
        location: () => "locations",
        today: (str) => `today/${str}`,
        upcoming: (str) => `upcoming/${str}`
    };

    const symbolEnum = {
        "Sunny": "&#x2600",
        "Partly sunny": "&#x26C5",
        "Overcast": "&#x2601",
        "Rain": "&#x2614",
        "Degrees": "&#176"
    }

    async function onSubmit(e) {
        try {
            const response = await fetch(BASE_URL + endpoints.location());
            const data = await response.json();
            const userLocation = locationRef.value;
            forecastRef.style.display = "block";

            const userPref = data.find(x => x.name === userLocation);
            fillToday(userPref.code);
            fillNextDay(userPref.code);

        } catch (error) {
            forecastRef.textContent = "Error";
            forecastRef.style.display = "block";
        }
        
    }

    async function fillToday(code) {
        try {
            const response = await fetch(BASE_URL + endpoints.today(code));
            const data = await response.json();
            createTodayInfo(data);

        } catch (error) {
            forecastRef.textContent = "Error";
        }
    }

    async function fillNextDay(code) {
        try {
            const response = await fetch(BASE_URL + endpoints.upcoming(code));
            const data = await response.json();

            createNextDayInfo(data)
            
        } catch (error) {
            forecastRef.textContent = "Error";
        }
    }

    function createNextDayInfo(data) {
        const container = document.createElement("div");
        container.classList.add("forecast-info");
        data.forecast.forEach(x => {
            const spanContainer = generateSpan(["upcoming"], "");
            const spSymbol = generateSpan(["symbol"], symbolEnum[x.condition]);
            const spDeg = generateSpan(["forecast-data"], `${x.low}${symbolEnum.Degrees}/${x.high}${symbolEnum.Degrees}`);
            const spCondition = generateSpan(["forecast-data"], x.condition);

            spanContainer.appendChild(spSymbol);
            spanContainer.appendChild(spDeg);
            spanContainer.appendChild(spCondition);
            container.appendChild(spanContainer);
        });

        upcoming.appendChild(container);
    }

    function createTodayInfo(data) {
        const forecastData = data.forecast;
        const container = document.createElement("div");
        container.classList.add("forecasts");
        const sp1 = generateSpan(["condition", "symbol"], symbolEnum[data.forecast.condition]);
        const spanContainer = generateSpan(["condition"], "");
        const spanName = generateSpan(["forecast-data"], data.name);
        const spanDeg = generateSpan(["forecast-data"], `${forecastData.low}${symbolEnum.Degrees}/${forecastData.high}${symbolEnum.Degrees}`);
        const spCondition = generateSpan(["forecast-data"], forecastData.condition);

        spanContainer.appendChild(spanName);
        spanContainer.appendChild(spanDeg);
        spanContainer.appendChild(spCondition);

        container.appendChild(sp1);
        container.appendChild(spanContainer);

        current.appendChild(container);
    }

    function generateSpan (classList, value) {
        const span = document.createElement("span");
        classList.forEach(x => span.classList.add(x));
        span.innerHTML = value;

        return span;
    }
}

attachEvents();