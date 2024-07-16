// calling from localStorage
let genreResult = JSON.parse(localStorage.getItem("genreResult")) || [];

// for testing purpose ------------ delete in the future
// const testGenre = "Action"; // or try ACTION
// const genreId = 28;
//localStorage.setItem("genre", JSON.stringify(testGenre));

// const genre = JSON.parse(localStorage.getItem("genre")) || "Action";
// API key for the movies database
// 1000 (1k) requests per hour. 500,000 requests per month
const moviesDatabaseAPI = "7e934c17e2mshcd85f90de49e405p139dacjsn81feb4b9bbf3";

// const genreZoneOne = document.querySelector("#results-1-5");
// const genreZoneTwo = document.querySelector("#results-6-10");

function movieGenre() {
  let genreResult = [];
  const moviesDatabaseURL =
    "https://advanced-movie-search.p.rapidapi.com/genre/movie/list";
  const moviesDatabaseOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": moviesDatabaseAPI,
      "x-rapidapi-host": "advanced-movie-search.p.rapidapi.com",
    },
  };

  fetch(moviesDatabaseURL, moviesDatabaseOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log("GENRE MOVIES \n----------");
      //   console.log(data.genres);
      //   console.log(data.genres[0].id); // example of getting the genre id

      for (const genre of data.genres) {
        const genreItem = {
          id: genre.id,
          name: genre.name,
        };
        // console.log(genreItem);
        genreResult.push(genreItem);
        localStorage.setItem("genreResult", JSON.stringify(genreResult));
      }
    //   console.log(genreResult[0]);
      genreResult = JSON.parse(localStorage.getItem("genreResult")) || [];
      return genreResult;
    });
}

function searchByGenre(genreTopic) {
  // grabs list of genres available
  console.log("search is running");
  let genreResult = movieGenre();
  console.log(genreResult); // giving me undefined, why?
  console.log("search is running showing yet?");
  let genreId = 0; // should be 28 for action
  for (const genre of genreResult) {
    consolelog(genre);
    if (genre.name == genreTopic) {
        genreId = genre.id;
        console.log(genreId);
        console.log(genre.name);
    }
  }
  const genreMovieList = `https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=${genreId}&page=1`;

  const genreMovieListOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": moviesDatabaseAPI,
      "x-rapidapi-host": "advanced-movie-search.p.rapidapi.com",
    },
  };

  fetch(genreMovieList, genreMovieListOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //   console.log("GENRE MOVIE TITLES LISTING \n----------");
      console.log(data.results);
    //   console.log(data.results[0].original_title);
      //   console.log(genre[0]);
      //   console.log(genreResult);

    //   for (const genre of data.genres) {
    //     const genreItem = {
    //       id: genre.id,
    //       name: genre.name,
    //     };
    //     // console.log(genreItem);
    //     genreResult.push(genreItem);
    //     localStorage.setItem("genreResult", JSON.stringify(genreResult));
    //   }
    //   console.log(genreResult);
    //   genreResult = JSON.parse(localStorage.getItem("genreResult")) || [];
    //   return genreResult;
    });
}

searchByGenre("Action");
