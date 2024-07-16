//get array from localStorage
//let searchResults = JSON.parse(localStorage.getItem("searchResults")) || []; // commented out for testing

//for testing im setting the localstorage item. DELETE ON REAL
//const testMovie = "barbie";
//localStorage.setItem("movie", JSON.stringify(testMovie));

const movie = JSON.parse(localStorage.getItem("movie"));
const imdbApi = "dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd";



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

searchMovies();

//for each item in array (up to 10)
function printResults(searchResults) {
    for (let i = 0; i < 10; i++) {
        const movie = searchResults[i];
        //making a new item for the each search result item
        const resultItem = document.createElement("div");
        resultItem.setAttribute("style", "text-align: center")
        const resultTitle = document.createElement("h4");
        resultTitle.textContent = movie.title;
        const resultYear = document.createElement("p");
        resultYear.textContent = movie.year;
        resultTitle
        const resultPoster = document.createElement("img");
        resultPoster.setAttribute("style", "width: 100px")
        resultPoster.setAttribute("src", movie.posterInfo);

        resultItem.append(resultPoster, resultTitle, resultYear);
        if (i<=5) {
            //results 1-5 go on top row
            movieZoneOne.append(resultItem);
        } else if(i>5){
            //results 6-10 go on bottom row
            movieZoneTwo.append (resultItem);
        }

        // titleEl.textContent = `Title: ${movie.title}`;
        // yearEl.textContent = `Release Year: ${movie.year}`;
        // posterEl.setAttribute("src", movie.posterInfo);


        }

    }

//onclick any of the posters or titles or whatever will take you to the mov page
//it will store the searchResults / result / id of the chosen movie so that the mov page can generate the poster etc
