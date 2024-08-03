const http = require("http");
const url = require("url");

let MoviesDatabase = [
    {
        IMDBId: "1234",
        Title: "Iron Man",
        Released: "2008-05-02",
        Genre: "Action, Adventure, Sci-Fi",
        Plot: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        Poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
    },
    {
        IMDBId: "0987",
        Title: "The Incredible Hulk",
        Released: "2008-06-13",
        Genre: "Action, Adventure, Sci-Fi",
        Plot: "Bruce Banner, a scientist on the run from the U.S. Government, must find a cure for the monster he turns into whenever he loses his temper.",
        Poster: "https://image.tmdb.org/t/p/w500/r8LPeldxskHrGJTPfhICyArJmT.jpg"
    },
    {
        IMDBId: "6543",
        Title: "Iron Man 2",
        Released: "2010-05-07",
        Genre: "Action, Adventure, Sci-Fi",
        Plot: "With the world now aware that he is Iron Man, billionaire inventor Tony Stark faces pressure from all sides to share his technology with the military.",
        Poster: "https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg"
    },
    {
        IMDBId: "8017",
        Title: "Thor",
        Released: "2011-05-06",
        Genre: "Action, Adventure, Fantasy",
        Plot: "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.",
        Poster: "https://image.tmdb.org/t/p/w500/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg"
    },
    {
        IMDBId: "3178",
        Title: "Captain America: The First Avenger",
        Released: "2011-07-22",
        Genre: "Action, Adventure, Sci-Fi",
        Plot: "Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a 'Super-Soldier serum'.",
        Poster: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg"
    },
    {
        IMDBId: "1579",
        Title: "The Avengers",
        Released: "2012-05-04",
        Genre: "Action, Adventure, Sci-Fi",
        Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
        Poster: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
    },
    {
        IMDBId: "9742",
        Title: "Iron Man 3",
        Released: "2013-05-03",
        Genre: "Action, Adventure, Sci-Fi",
        Plot: "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",
        Poster: "https://image.tmdb.org/t/p/w500/1Ilv6ryHUv6rt9zIsbSEJUmmbEi.jpg"
    },
    {
        IMDBId: "5412",
        Title: "Thor: The Dark World",
        Released: "2013-11-08",
        Genre: "Action, Adventure, Fantasy",
        Plot: "When the Dark Elves attempt to plunge the universe into darkness, Thor must embark on a perilous and personal journey to reunite Jane Foster.",
        Poster: "https://image.tmdb.org/t/p/w500/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg"
    },
    {
        IMDBId: "1942",
        Title: "Captain America: The Winter Soldier",
        Released: "2014-04-04",
        Genre: "Action, Adventure, Sci-Fi",
        Plot: "As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.",
        Poster: "https://image.tmdb.org/t/p/w500/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg"
    },
    {
        IMDBId: "3874",
        Title: "Guardians of the Galaxy",
        Released: "2014-08-01",
        Genre: "Action, Adventure, Comedy",
        Plot: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
        Poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg"
    }
];

function searchMoviesByTitle(search){
    let SearchedMovies = [];
    MoviesDatabase.forEach((movie) => {
        if(movie.Title.toLowerCase().includes(search.toLowerCase())){
            SearchedMovies.push(movie);
        }
    });
    return SearchedMovies;
}


function searchMoviesById(search){
    let SearchedMovies = [];
    MoviesDatabase.forEach((movie) => {
        if(movie.IMDBId.includes(search)){
            SearchedMovies.push(movie);
        }
    });
    return SearchedMovies;
}


const server = http.createServer((req, res) => {
    if(req.url.startsWith("/?search=")){
        let searchQuery = url.parse(req.url, true).query;
        let searchTitle = searchQuery.search;
        let ReturnedMovies = searchMoviesByTitle(searchTitle);
        if(ReturnedMovies.length !== 0){
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(
                {Search: ReturnedMovies,
                Total: ReturnedMovies.length,
                Response: "Success"
            }
            ));
        }
        else{
            res.writeHead(300, {"Content-Type": "application/json"});
            res.end(JSON.stringify(
                {   Search: null,
                    Total: 0,
                    Response: "No Movies found"
                }
            ));
        }
    }
    else if(req.url.startsWith("/?id=")){
        let searchQuery = url.parse(req.url, true).query;
        let searchId = searchQuery.id;
        let ReturnedMovies = searchMoviesById(searchId);
        if(ReturnedMovies.length !== 0){
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(
                {Search: ReturnedMovies,
                Response: "Success"
            }
            ));
        }
        else{
            res.writeHead(300, {"Content-Type": "application/json"});
            res.end(JSON.stringify(
                {   Search: null,
                    Response: "No Movies found"
                }
            ));
        }

    }
    else{
        res.setHeader('Content-type', 'text/plain');
        res.end("We got Nothing");
    }

});

server.listen(5000, () => {
    console.log("Server listening on port 5000");
});
