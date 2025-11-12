
const section = document.querySelectorAll("section");
const createSection = document.getElementById("add-movie");

export function showCreateView() {
    section.forEach(section => section.style.display = "none");
    createSection.style.display = "block";
}