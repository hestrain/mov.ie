// for testing im setting hard movie and movie id, but eventually these will be from a user input
const movie = "jumanji";
const movieId = "tt7975244";

//setting localstorage
const searchResults = json.parse(localStorage.getItem("searchResults")) || [];
console.log(searchResults);

//imdb information
const imdbUrl = `https://imdb146.p.rapidapi.com/v1/find/?query=${movie}`;
const imdbOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd",
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
        const searchItem = {
            title: movie.titleNameText,
            year: movie.titleReleaseText,
            id: movie.id,
            posterInfo: movie.titlePosterImageModel,
        }

        // log results
        console.log(searchItem);
        console.log(searchResults);
        //add to the search item array
        searchResults.push(searchItem);
        //send info back to localstorage
        localStorage.setItem("searchResults", JSON.stringify(searchResults));
        //log to check
        console.log(searchResults);

        //   console.log(movie.titleNameText);
        //   console.log(movie.titleReleaseText);
        //   console.log(movie.id);
        //   console.log(movie.titlePosterImageModel.url);
      //   getOTT(movieId);

    }
  })

//OTT API function
function getOTT() {
  //url for OTT API
  const ottUrl = `https://streaming-availability.p.rapidapi.com/shows/${movieId}?output_language=en`;
  const ottOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd",
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };
  
  fetch(ottUrl, ottOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (services) {
      console.log(" STREAM INFO \n----------");
      console.log(services);
      // TODO: Loop through the response
        console.log(services.title);
        console.log(services.releaseYear);
        for (const service of services.streamingOptions.us) {
          if (service.type == "subscription") {
            console.log(service.link);
            console.log(service.service.id);
          }
        }
    });
}
