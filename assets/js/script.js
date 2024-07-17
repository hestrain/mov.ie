//empty array for the top 5 imdb movies
let topFive = [];

//the input element of the searchbar so we can get data from it
const searchLine = document.querySelector("#tiny-input");
console.log(searchLine);

//the button element of the searchbar for the event listener
const searchButton = document.querySelector("#search-btn");

//gets the document area to put the search history in
const historySection = document.querySelector("#movie-history"); //add this ID into the div at 265ish within class searched-movie
//also youll need to delete/comment out the divs under the bit above ^

//code for API to load images on carousel
function getTopFive() {
  const carouselInfoUrl = "https://imdb-top-100-movies.p.rapidapi.com/";
  const carouselInfoOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd",
      "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };

  fetch(carouselInfoUrl, carouselInfoOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (topMovies) {
      console.log("TOP 5 MOVIES \n----------");
      //logging the whole array to check
      console.log(topMovies);
      // for each of the top 5 movies in the imdb top 100
      for (let i = 0; i < 5; i++) {
        const movie = topMovies[i];
        //making a new item for the search result items
        const movieInfo = {
          title: movie.title,
          year: movie.year,
          id: movie.imdbid,
          posterInfo: movie.image,
        };
        // //add to the movie item to the top 5 array
        topFive.push(movieInfo);
        console.log(movieInfo.posterInfo);

        const carouselImg = document.querySelector(`#carousel-img-${i}`);
        carouselImg.setAttribute("src", movieInfo.posterInfo);
        carouselImg.setAttribute("title", movieInfo.title);
        carouselImg.setAttribute("imdbid", movieInfo.id);
      }
    });
}

// Code for Carousel
document.addEventListener("DOMContentLoaded", function () {
  const carouselElement = document.getElementById("default-carousel");

  const items = [
    {
      position: 0,
      el: carouselElement.querySelector("[data-carousel-item]:nth-child(1)"),
    },
    {
      position: 1,
      el: carouselElement.querySelector("[data-carousel-item]:nth-child(2)"),
    },
    {
      position: 2,
      el: carouselElement.querySelector("[data-carousel-item]:nth-child(3)"),
    },
    {
      position: 3,
      el: carouselElement.querySelector("[data-carousel-item]:nth-child(4)"),
    },
    {
      position: 4,
      el: carouselElement.querySelector("[data-carousel-item]:nth-child(5)"),
    },
  ];

  const options = {
    defaultPosition: 0,
    interval: 3000,
    indicators: {
      activeClasses: "bg-white dark:bg-gray-800",
      inactiveClasses:
        "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
      items: [
        {
          position: 0,
          el: carouselElement.querySelector('[data-carousel-slide-to="0"]'),
        },
        {
          position: 1,
          el: carouselElement.querySelector('[data-carousel-slide-to="1"]'),
        },
        {
          position: 2,
          el: carouselElement.querySelector('[data-carousel-slide-to="2"]'),
        },
        {
          position: 3,
          el: carouselElement.querySelector('[data-carousel-slide-to="3"]'),
        },
        {
          position: 4,
          el: carouselElement.querySelector('[data-carousel-slide-to="4"]'),
        },
      ],
    },
    onNext: () => {
      console.log("next slider...");
    },
    onPrev: () => {
      console.log("previous slider...");
    },
    onChange: (position) => {
      console.log(`changed to slider ${position}`);
    },
  };

  const carousel = new Carousel(carouselElement, items, options);

  // Event listeners for controls
  carouselElement
    .querySelector("[data-carousel-prev]")
    .addEventListener("click", () => {
      carousel.prev();
    });
  carouselElement
    .querySelector("[data-carousel-next]")
    .addEventListener("click", () => {
      carousel.next();
    });
});

//calls the function to get the top 5 imdb movies
getTopFive();


//function to deal with search query
function searchHandler(event) {
  //prevent refresh
  event.preventDefault();
  //log to check
  console.log(searchLine.value.trim());
  //set movie to what user searchd
  search = searchLine.value.trim();
  

  //im storing it to localstorage just in case we need it in this format?
  localStorage.setItem("search", JSON.stringify(search));

  //reser the searchbar
  $(searchLine).text = "";
  //take you to the search page NEEDS TO BE LAST THING IN FUNCTION
  window.location.href = "./search.html";
}

//search event listener
searchButton.addEventListener("click", searchHandler);

//gets the 3 most recent searches from localstorage
let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || []; //we want this to be an array of 3

renderRecentSearches();
console.log(recentSearches);


//function that renders the 3 most recently searched movies 
function renderRecentSearches () {
  for (let i = 0; i < recentSearches.length; i++) {
    const movie = recentSearches[i];
    console.log(movie);
    //making a new button for the each search result object
    //button that encompasses the rest of the info
    const pastMovie = document.createElement("button");
    pastMovie.setAttribute("style", "text-align: center");
    pastMovie.setAttribute("class", "searched-movie w-1/3 h-40 bg-black-500 flex items-center justify-center")
    //title el
    const pastTitle = document.createElement("h4");
    pastTitle.textContent = movie.title;
    //poster el
    const pastPoster = document.createElement("img");
    pastPoster.setAttribute("style", "width: 100px");
    pastPoster.setAttribute("src", movie.posterInfo);
    pastPoster.setAttribute("id", movie.id);
    pastPoster.setAttribute('class', "movie-poster")

    //add it all together
    pastMovie.append(pastTitle, pastPoster);
    historySection.append(pastMovie);

    }

}

//section that holds all the search results as buttons
let movieButtons = document.querySelector("#movie-history");
//event listener for which poster-button you click on
movieButtons.addEventListener("click", function(event){
  //log to figure out which one got pressed
  const element = event.target;
  console.log(element);
  //it shoudl be an image and if so...
  if (element.matches('img') === true) {
    //get the id (which is the imdb id)
    const clickedId = element.getAttribute('id');
    console.log(clickedId);

    //get the search result array to search through it
    recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
    console.log(recentSearches);
    
    //look through search result array to find marching id/imdb id
    const result = recentSearches.find(({ id }) => id == clickedId);
    console.log(result); //log to check
    
    //this is our final movie! set the result to the movie variable
    movie = result;

    //put the movie into local storage becuase we'll need it on the next page
    localStorage.setItem("movie", JSON.stringify(movie));
    //take us to the final movie info page
    window.location.href = "./mov.html";
  }
})