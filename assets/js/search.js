//imdb api key
const imdbApi = "dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd"; //HEATHERS API KEY

//the input element of the searchbar so we can get data from it
const searchLine = document.querySelector("#tiny-input");
console.log(searchLine); //to check

//the button element of teh searchbar for the event listener
const searchButton = document.querySelector("#search-btn");


const movieZoneOne = document.querySelector("#results-1-5");
const movieZoneTwo = document.querySelector("#results-6-10");

//function that gets movies from the imdb database
function searchMovies() {

  //imdb information
  const imdbUrl = `https://imdb146.p.rapidapi.com/v1/find/?query=${search}`;
  const imdbOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": imdbApi,
      "x-rapidapi-host": "imdb146.p.rapidapi.com",
    },
  };

  // imdb api fetch
  fetch(imdbUrl, imdbOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (movies) {
      //logging the whole array to check
      console.log("MOVIES FROM SEARCH \n----------");
      console.log(movies);
      // Loop through the response
      for (const movie of movies.titleResults.results) {
        //making a new item for the search result items. we dont want anything that hasnt been released yet.
        if (movie.titleReleaseText < 2025) {

        }
      }
      //log the whole array
      console.log(searchResults);
      //print/render the search results on the page
      printResults(searchResults);
    });
}

//calls the search movies function as soon as you load the page
searchMovies();

//print/render function for loading the results pn the page
//for each item in array (up to 10)
function printResults(searchResults) {
}
