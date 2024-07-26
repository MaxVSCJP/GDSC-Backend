const resultsDiv = document.getElementById("results");
const loader = document.createElement("h1");
let MovieArray;


function displayLoading(){
    loader.textContent = "Loading...";
    resultsDiv.appendChild(loader);
}//end of displayLoading function


function loadResults(searchQuery, page=1){
    let movieResults = fetch(`https://www.omdbapi.com/?apikey=b2f1a261&s=${searchQuery}&page=${page}`);
    movieResults
        .then(results => results.json())
        .then(data => {
            MovieArray = data.Search;
            console.log(MovieArray);
            resultsDiv.innerHTML = "";
            addMoviestoPage();
        })
        .catch(error => {
            let errorMessage = document.createElement("h1");
            errorMessage.textContent = "Failed to get data on the Movie Searched";
            resultsDiv.innerHTML = "";
            resultsDiv.appendChild(errorMessage);
        });
}//end of loadResults function


function addMoviestoPage(){
    MovieArray.forEach((movie)=>{
        let MovieDiv = document.createElement("div");
        MovieDiv.setAttribute("class", "movies");
        MovieDiv.style.width = "200px";
        MovieDiv.style.display = "flex";
        MovieDiv.style.flexDirection = "column";
        MovieDiv.style.justifyContent= "center";
        MovieDiv.style.gap = "5px";

        let posterImage = document.createElement("img");
        posterImage.setAttribute("src", `${movie.Poster}`);
        posterImage.setAttribute("alt", `${movie.Title} poster image`);
        posterImage.setAttribute("width", "200px");

        let movieTitle= document.createElement("p");
        movieTitle.innerHTML = `${movie.Title} (${movie.Year})`

        MovieDiv.appendChild(posterImage);
        MovieDiv.appendChild(movieTitle);
        resultsDiv.appendChild(MovieDiv);

        MovieDiv.addEventListener("click", () => {
            window.open(`Details.html?imdbID=${movie.imdbID}`, "_blank");
            // window.location.href = `Details.html?imdbID=${movie.imdbID}`;
        })
    });
}// end of addMoviestoPage function



const SearchMovies = document.getElementById("Search-Button");
const MovieQuery = document.getElementById("Movie");

MovieQuery.addEventListener("keypress", function(eve){
    if(eve.key === "Enter") {
        loadResults(MovieQuery.value);
        displayLoading();
    }
});


SearchMovies.addEventListener("click", function(){
    loadResults(MovieQuery.value);
    displayLoading();
})