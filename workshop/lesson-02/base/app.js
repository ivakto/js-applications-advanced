start();
// Даваме на скрипта defer - това значи, че тази фукция ще се изпълни, когато целият документ е зареден

function start() {
    fetch('http://localhost:3030/jsonstore/cookbook/recipes')
        .then((responce) => responce.json())
        .then(showRecipes); // шаблонна заявка fetch на адреса, който ни е даден в условието
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

    return result;

}
