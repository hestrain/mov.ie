let genreTopic = JSON.parse(localStorage.getItem("genreTopic"));
//the input element of the searchbar so we can get data from it
const searchLine = document.querySelector("#tiny-input");
console.log(searchLine);

//the button element of the searchbar for the event listener
const searchButton = document.querySelector("#search-btn");

// calling from localStorage
let genreResult = [
{id: 28, name: 'Action'},
{id: 12, name: 'Adventure'},
{id: 16, name: 'Animation'},
{id: 35, name: 'Comedy'},
{id: 80, name: 'Crime'},
{id: 99, name: 'Documentary'},
{id: 18, name: 'Drama'},
{id: 10751, name: 'Family'},
{id: 14, name: 'Fantasy'},
{id: 36, name: 'History'},
{id: 27, name: 'Horror'},
{id: 10402, name: 'Music'},
{id: 9648, name: 'Mystery'},
{id: 10749, name: 'Romance'},
{id: 878, name: 'Science Fiction'},
{id: 10770, name: 'TV Movie'},
{id: 53, name: 'Thriller'},
{id: 10752, name: 'War'},
{id: 37, name: 'Western'},];

//clear the genre list so that you can get a new one
let genreList = [];
//grab the row the posters will be printed in

const movieZoneOne = document.querySelector("#results-1-5");
const movieZoneTwo = document.querySelector("#results-6-10");

const moviesDatabaseAPI = "7e934c17e2mshcd85f90de49e405p139dacjsn81feb4b9bbf3";

function searchByGenre(genreTopic) {
  // grabs list of genres available
  console.log("search is running");
  console.log(genreResult); // giving me undefined, why?
  console.log("search is running showing yet?");
  let genreId = 0; // should be 28 for action
  for (const genre of genreResult) {
    console.log(genre);
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
      console.log(data.results[0].original_title);

      for (const genreMovie of data.results) {
        const genreItem = {
          id: genreMovie.id,
          title: genreMovie.original_title,
          poster: genreMovie.poster_path,
        };
        console.log(genreItem);
        genreList.push(genreItem);
        localStorage.setItem("genreList", JSON.stringify(genreList));
      }
      console.log(genreList);
      genreList = JSON.parse(localStorage.getItem("genreList")) || [];
      printResults(genreList);
      return genreList;
    });
}


searchByGenre(genreTopic);


//print/render function for loading the results pn the page
//for each item in array (up to 10)
function printResults(genreList) {
  let genreHeader = document.querySelector("#genre-name");
  genreHeader.textContent = `Genre: ${genreTopic}`;
  //onclick any of the posters or titles or whatever will take you to the mov page
  //it will store the searchResults / result / id of the chosen movie so that the mov page can generate the poster etc
  for (let i = 0; i < 10; i++) {
    const movie = genreList[i];
    //making a new button for the each search result object
    //button that encompasses the rest of the info
    const resultItem = document.createElement("button");
    resultItem.setAttribute("style", "text-align: center");
    resultItem.setAttribute("class", "movie-button");
    //title el
    const resultTitle = document.createElement("h4");
    resultTitle.textContent = movie.title;
    //poster el
    const resultPoster = document.createElement("img");
    resultPoster.setAttribute("style", "width: 100px");
    resultPoster.setAttribute("src", movie.poster);
    resultPoster.setAttribute("id", movie.id);
    resultPoster.setAttribute("class", "movie-poster");
  
    //add it all together
    resultItem.append(resultPoster, resultTitle,);
  
    //choose which row it goes on
    if (i <= 5) {
      //results 1-5 go on top row
      movieZoneOne.append(resultItem);
    } else if (i > 5) {
      //results 6-10 go on bottom row
      movieZoneTwo.append(resultItem);
    }
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
      console.log(element);
      console.log(clickedId);
  
      //get the search result array to search through it
      searchResults = JSON.parse(localStorage.getItem("searchResults"));
      console.log(searchResults);
  
      //look through search result array to find marching id/imdb id
      const result = searchResults.find(({ id }) => id == clickedId);
      console.log(result); //log to check
  
      //this is our final movie! set the result to the movie variable
      movie = result;
  
      console.log(result);
  
      //put the movie into local storage becuase we'll need it on the next page
      localStorage.setItem("movie", JSON.stringify(movie));
      //take us to the final movie info page
      window.location.href = "./mov.html";
    }
  });
  


  