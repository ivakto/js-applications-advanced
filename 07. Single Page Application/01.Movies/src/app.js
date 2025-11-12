// 1. Започваме с логиката за скриване/показване на различните <section class="view-section"> 
// елементи и настройване на кликването върху връзките в навигационния бар да сменя изгледите.

import { showCreateView } from "./createView.js";
import { showHome } from "./homeView.js";
import { showLoginView } from "./loginView.js";
import { logout } from "./logout.js";
import { showRegisterView } from "./registerView.js";

document.querySelectorAll("section").forEach(section => section.style.display = "none");
// Скриваме, за да имаме пълен контол върху това какво ще се показва на екрана

//2. Отиваме кум hrefovete и ги променяме, за да кажем какво да се показва след url

// Оправяне на навигацията - трябва да хванем всички линкове, които са в nab бара и 
// всеки линк да каже какво иска да

document.querySelector("nav").addEventListener("click", onNavigate);

showHome(); // Да ни е винаги показано полето след рефрешване

const routes = {
    "/": showHome,
    "/home": showHome,
    "/login": showLoginView,
    "/register": showRegisterView,
    "/logout": logout,
    "/create": showCreateView,
}


function onNavigate(event) {
    const el = event.target;

    if (el.tagName !== "A" || el.href === "") { return; } // Ако не е линк (anker) се прекратява изпълнението

    event.preventDefault();
    // Предотвратяваме презареждането

    const path = new URL(el.href).pathname;
    // Този код служи за извличане на частта с пътя (pathname) от даден линк, 
    // като игнорира домейна и протокола.

    routes[path]();
    // Връща функция, която можем да извикаме 
}  