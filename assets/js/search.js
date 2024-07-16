//get array from localStorage
//let searchResults = JSON.parse(localStorage.getItem("searchResults")) || []; // commented out for testing

//for testing im setting the localstorage item. DELETE ON REAL
//const testMovie = "barbie";
//localStorage.setItem("movie", JSON.stringify(testMovie));

const imdbApi = "dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd"; //HEATHERS API KEY

//the input element of the searchbar so we can get data from it
const searchLine = document.querySelector("#tiny-input");
console.log(searchLine);

//the button element of teh searchbar for the event listener
const searchButton = document.querySelector("#search-btn");

//get movie from storage....
let movie = JSON.parse(localStorage.getItem("movie"));

//grab the area the posters will be printed in
const movieZoneOne = document.querySelector("#results-1-5");
const movieZoneTwo = document.querySelector("#results-6-10");

function searchMovies() {

const searchResults = [];

  //imdb information
  const imdbUrl = `https://imdb146.p.rapidapi.com/v1/find/?query=${movie}`;
  const imdbOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": imdbApi,
      "x-rapidapi-host": "imdb146.p.rapidapi.com",
    },
  };

  // imdb fetch
  fetch(imdbUrl, imdbOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (movies) {
      console.log("MOVIES FROM SEARCH \n----------");
      //logging the whole array to check
      console.log(movies);
      // TODO: Loop through the response
      for (const movie of movies.titleResults.results) {
        //making a new item for the search result items
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
            //log to check
        }

      }
      console.log(searchResults);
      printResults(searchResults);
    });
}

//calls the search movies function 
searchMovies();

//for each item in array (up to 10)
function printResults(searchResults) {
    for (let i = 0; i < 10; i++) {
        const movie = searchResults[i];
        //making a new item for the each search result item
        const resultItem = document.createElement("button");
        resultItem.setAttribute("style", "text-align: center");
        resultItem.setAttribute("class", "movie-button")
        const resultTitle = document.createElement("h4");
        resultTitle.textContent = movie.title;
        const resultYear = document.createElement("p");
        resultYear.textContent = movie.year;
        resultTitle
        const resultPoster = document.createElement("img");
        resultPoster.setAttribute("style", "width: 100px");
        resultPoster.setAttribute("src", movie.posterInfo);
        resultPoster.setAttribute("id", movie.id);
        resultPoster.setAttribute('class', "movie-poster")

        resultItem.append(resultPoster, resultTitle, resultYear);

        if (i<=5) {
            //results 1-5 go on top row
            movieZoneOne.append(resultItem);
        } else if(i>5){
            //results 6-10 go on bottom row
            movieZoneTwo.append (resultItem);
        }
        }

    }

//onclick any of the posters or titles or whatever will take you to the mov page
//it will store the searchResults / result / id of the chosen movie so that the mov page can generate the poster etc


//function to deal with search query
function searchHandler(event) {
  //prevent refresh
  event.preventDefault();
  //log to check
  console.log(searchLine.value.trim());
  //set movie to what user searchd
  movie = searchLine.value.trim();

  //im storing it to localstorage just in case we need it in this format?
  localStorage.setItem("movie", JSON.stringify(movie));

  //reser the searchbar
  $(searchLine).text = "";
  //take you to the search page NEEDS TO BE LAST THING IN FUNCTION
  window.location.href = "./search.html";
}

//event listener for the search button
searchButton.addEventListener("click", searchHandler);

let movieButtons = document.querySelector("#movie-results");
movieButtons.addEventListener("click", function(event){
  const element = event.target;
  console.log(element);
  // TODO: Describe the functionality of the following `if` statement.
  if (element.matches('img') === true) {
    const clickedId = element.getAttribute('id');
    console.log(clickedId);

    searchResults = JSON.parse(localStorage.getItem("searchResults"));
    console.log(searchResults);
    
    const result = searchResults.find(({ id }) => id == clickedId);
    movie = result;

    localStorage.setItem("movie", JSON.stringify(movie));
    
    console.log(result); //
    window.location.href = "./mov.html";
  }
})

//readSearch Results