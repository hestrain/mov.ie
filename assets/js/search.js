//imdb api key
const imdbApi = "dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd"; //HEATHERS API KEY

//the input element of the searchbar so we can get data from it
const searchLine = document.querySelector("#tiny-input");
console.log(searchLine); //to check

//the button element of teh searchbar for the event listener
const searchButton = document.querySelector("#search-btn");

//get movie (last actual result) from storage....
let movie = JSON.parse(localStorage.getItem("movie"));

//get search term from storage
let search = JSON.parse(localStorage.getItem("search"));

//grab the row the posters will be printed in

const movieZoneOne = document.querySelector("#results-1-5");
const movieZoneTwo = document.querySelector("#results-6-10");

//function that gets movies from the imdb database
function searchMovies() {
  //sets search results to an empty array so we can fill it with the API data
  const searchResults = [];

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
          const searchItem = {
            title: movie.titleNameText,
            year: movie.titleReleaseText,
            id: movie.id,
            posterInfo: movie.titlePosterImageModel.url,
          };

          // log results
          console.log(searchItem);

          //add to the search item array
          searchResults.push(searchItem);
          //send info back to localstorage
          localStorage.setItem("searchResults", JSON.stringify(searchResults));
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
  for (let i = 0; i < 10; i++) {
    const movie = searchResults[i];
    //making a new item for the each search result item
    const resultItem = document.createElement("div");
    resultItem.setAttribute("style", "text-align: center");
    const resultTitle = document.createElement("h4");
    resultTitle.textContent = movie.title;
    const resultYear = document.createElement("p");
    resultYear.textContent = movie.year;
    resultTitle;
    const resultPoster = document.createElement("img");
    resultPoster.setAttribute("style", "width: 100px");
    resultPoster.setAttribute("src", movie.posterInfo);

    resultItem.append(resultPoster, resultTitle, resultYear);
    if (i <= 5) {
      //results 1-5 go on top row
      movieZoneOne.append(resultItem);
    } else if (i > 5) {
      //results 6-10 go on bottom row
      movieZoneTwo.append(resultItem);
    }
  }
}

//onclick any of the posters or titles or whatever will take you to the mov page
//it will store the searchResults / result / id of the chosen movie so that the mov page can generate the poster etc
for (let i = 0; i < 10; i++) {
  const movie = searchResults[i];
  //making a new button for the each search result object
  //button that encompasses the rest of the info
  const resultItem = document.createElement("button");
  resultItem.setAttribute("style", "text-align: center");
  resultItem.setAttribute("class", "movie-button");
  //title el
  const resultTitle = document.createElement("h4");
  resultTitle.textContent = movie.title;
  //year el
  const resultYear = document.createElement("p");
  resultYear.textContent = movie.year;
  //poster el
  const resultPoster = document.createElement("img");
  resultPoster.setAttribute("style", "width: 100px");
  resultPoster.setAttribute("src", movie.posterInfo);
  resultPoster.setAttribute("id", movie.id);
  resultPoster.setAttribute("class", "movie-poster");

  //add it all together
  resultItem.append(resultPoster, resultTitle, resultYear);

  //choose which row it goes on
  if (i <= 5) {
    //results 1-5 go on top row
    movieZoneOne.append(resultItem);
  } else if (i > 5) {
    //results 6-10 go on bottom row
    movieZoneTwo.append(resultItem);
  }
}

//function to deal with NEW search query
function searchHandler(event) {
  //prevent refresh
  event.preventDefault();
  //log to check
  console.log(searchLine.value.trim());
  //set movie to what user searchd
  search = searchLine.value.trim();

  //im storing it to localstorage just in case we need it in this format?
  localStorage.setItem("search", JSON.stringify(search));

  //reset/clear the searchbar
  $(searchLine).text = "";
  //take you to the search page NEEDS TO BE LAST THING IN FUNCTION
  window.location.href = "./search.html";
}

//event listener for the search button
searchButton.addEventListener("click", searchHandler);

//section that holds all the search results as buttons
let movieButtons = document.querySelector("#movie-results");
//event listener for which poster-button you click on
movieButtons.addEventListener("click", function (event) {
  //log to figure out which one got pressed
  const element = event.target;
  console.log(element);
  //it shoudl be an image and if so...
  if (element.matches("img") === true) {
    //get the id (which is the imdb id)
    const clickedId = element.getAttribute("id");
    console.log(clickedId);

    //get the search result array to search through it
    searchResults = JSON.parse(localStorage.getItem("searchResults"));
    console.log(searchResults);

    //look through search result array to find marching id/imdb id
    const result = searchResults.find(({ id }) => id == clickedId);
    console.log(result); //log to check

    //this is our final movie! set the result to the movie variable
    movie = result;

    //put the movie into local storage becuase we'll need it on the next page
    localStorage.setItem("movie", JSON.stringify(movie));
    //take us to the final movie info page
    window.location.href = "./mov.html";
  }
});
