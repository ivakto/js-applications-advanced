import { userUtils } from "./userUtils.js";
import { dataService } from "./dataService.js";

const section = document.querySelectorAll("section");
const homeSection = document.getElementById("home-page");
const addBtn = document.getElementById("add-movie-button");
const movieContainer = document.getElementById("movie");
const movieList = document.getElementById("movies-list");

export function showHome() {
    section.forEach(x => x.style.display = "none");
    homeSection.style.display = "block";

    if (userUtils.getUserData()) {
        addBtn.style.display = "block";
    }
    
    movieContainer.style.display = "block";
    showAllMovies();
}

async function showAllMovies() {
    movieList.innerHTML = "";
    const movies = await dataService.getAllMovies();
    movies.forEach(x => movieList.appendChild(createMovie(x)));
}

function createMovie(data) { 
    const userData = userUtils.getUserData();
    const li = document.createElement("li");

    li.classList.add("card");
    li.classList.add("mb-4");
    
    li.innerHTML = `
        <img class="card-img-top" src="${data.img}" alt="Card image cap" width="400" />
        <div class="card-body">
            <h4 class="card-title">${data.title}</h4>
            <a href="#">
            </a>
        </div>
        <div class="card-footer">
            ${!!userData ? 
                `<button type="button" click=${showDetails()} data-id=${data._id} class="btn btn-info details-btn">Details</button>` : '' 
            }
        </div>
    `
    return li;
}

function showDetails() {console.log("showDetails")};