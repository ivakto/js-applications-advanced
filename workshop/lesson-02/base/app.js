start();
// Даваме на скрипта defer - това значи, че тази фукция ще се изпълни, когато целият документ е зареден

async function start() {
    const res = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    const date = await res.json();
    showRecipes(data);
        //.then((responce) => responce.json())
        //.then(showRecipes); // шаблонна заявка fetch на адреса, който ни е даден в условието
    // нужно е тази функция да я изпълня, чак когато body-то е заредено    
}

function showRecipes(data) {
    const main = document.querySelector('main');
    const recipes = Object.values(data); // вадим самите рецепти
    main.replaceChildren(...recipes.map(createPreview)); // запазваме ги в масив и после резултата го ползваме като деца на main
}

function createPreview(recipe) {
    const result = document.createElement('article');
    result.className = 'preview';

    result.innerHTML = 
    `<div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small">
        <img src="${recipe.img}">
    </div>`;

    result.addEventListener('click', async () => {
        const url = `http://localhost:3030/jsonstore/cookbook/details/${recipe._id}`;
        const result = await fetch(url);
        const data = await result.json();

        result.innerHTML = `
         <h2>${data.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src="${data.img}">
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${data.ingredients.map(i => `<li>${i}</li>`).join('\n')}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${data.steps.map(i => `<p>${i}</p>`).join('\n')}
            </div>`;
    })

    return result;

}
