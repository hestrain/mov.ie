//variables of needed document elements
const movieZone = document.querySelector("#movie-info");
const streamingZone = document.querySelector("#streaming-info");
const titleEl = document.querySelector("#title");
const yearEl = document.querySelector("#year");
const descEl = document.querySelector("#desc");
const posterEl = document.querySelector("#poster");
const directorEl = document.querySelector("#director");
const castEl = document.querySelector("#cast");

//the input element of the searchbar so we can get data from it
const searchLine = document.querySelector("#tiny-input");
console.log(searchLine);

//the button element of teh searchbar for the event listener
const searchButton = document.querySelector("#search-btn");

//get movie from storage....
let movie = JSON.parse(localStorage.getItem("movie"));


// for testing im setting hard movie and movie id, but eventually these will be from a user input
//for testing purposes i'm setting this. in reality it'll be from user input
const testMovie = {
  id: "tt2283362",
  title: "Jumanji: Welcome to the Jungle",
  year: "2017",
  posterUrl:
    "https://m.media-amazon.com/images/M/MV5BODQ0NDhjYWItYTMxZi00NTk2LWIzNDEtOWZiYWYxZjc2MTgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
};

//setting ott key as a variable so its easier to change when we max out fetches
const ottKey = "7e934c17e2mshcd85f90de49e405p139dacjsn81feb4b9bbf3"; //eliots key

//setting localstorage
const searchResults = JSON.parse(localStorage.getItem("searchResults")) || [];
console.log(searchResults);

//OTT API function
function getOTT() {
  //url for OTT API
  const ottUrl = `https://streaming-availability.p.rapidapi.com/shows/${testMovie.id}?output_language=en`;
  const ottOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": ottKey,
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };
//fetch the data
  fetch(ottUrl, ottOptions)
    .then(function (response) {
      //return data as json
      return response.json();
    })
    .then(function (services) {
      console.log(" STREAM INFO \n----------");
      //log the whole thing so i can figure out what data we need
      console.log(services);
      // then get info from response

      //set description, direcor, cast
      descEl.textContent = `Description: ${services.overview}`;

      //print out the content of directors
      directorEl.textContent = `Director: ${services.directors[0]}`;

      //print each cast member as a list item
      for (let i = 0; i < services.cast.length; i++) {
        const actor = services.cast[i];
       //create list element with actor name
        const castMember = document.createElement("li");
        castMember.textContent = actor;
        //append actor to list
        castEl.append(castMember);
        //log to check
        console.log(actor);
      }

      //check if streaming option is "subscurption"
      for (const service of services.streamingOptions.us) {
        if (service.type == "subscription") {
          console.log(service.link);
          console.log(service.service.id);

          //then add new link element to the streaming info section
          const siteLinkEl = document.createElement("a");
          //set href to steam link and text to stream service name
          siteLinkEl.setAttribute("href", service.link);
          siteLinkEl.textContent = service.service.id;

          //append to the streaming info section
          streamingZone.append(siteLinkEl);
        }
      }
    });
}

//print final page stuff
function renderPage() {
  titleEl.textContent = `Title: ${testMovie.title}`;
  yearEl.textContent = `Release Year: ${testMovie.year}`;
  posterEl.setAttribute("src", testMovie.posterUrl);
  getOTT();
}

//call render page which calls the OTT streaming info function to fill out the page
renderPage();

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

searchButton.addEventListener("click", searchHandler);
