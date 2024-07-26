/*I know the color combination is horrible between the first and second page but this is
just practise, and I'm done and I can't be bothered to spend 10 minutes choosing a better
color combination between the pages*/

window.addEventListener('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const imdbID = urlParams.get('imdbID');
        if (imdbID) {
                openDetailedPage(imdbID);
        }
});


function openDetailedPage(imdbID){
    let movieDetails = fetch(`https://www.omdbapi.com/?apikey=b2f1a261&i=${imdbID}&plot=full`);
    movieDetails
        .then(results => results.json())
        .then(data => {
            console.log(data)
            let Poster_Image = document.getElementById("Poster-Image");
            let Movie_Title = document.getElementById("Movie-Title");
            let Movie_Year = document.getElementById("Release-date");
            let Genre = document.getElementById("Genre");
            let Plot = document.getElementById("Plot");

            console.log(Movie_Title.textContent);

            Poster_Image.setAttribute("alt", `${data.Title} poster image`);
            Poster_Image.setAttribute("src", `${data.Poster}`);
            Poster_Image.setAttribute("width", "300px");

            Movie_Title.innerHTML = `${data.Title}`;

            Movie_Year.innerHTML = `${data.Released}`;

            Genre.innerHTML = `${data.Genre}`;

            Plot.innerHTML = `${data.Plot}`;
        });
}