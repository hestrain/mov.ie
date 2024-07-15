//code for API to load images on carousel
const topFive = [];

const carouselImg1 = document.querySelector("#carousel-img-1");
const carouselImg2 = document.querySelector("#carousel-img-2");
const carouselImg3 = document.querySelector("#carousel-img-3");
const carouselImg4 = document.querySelector("#carousel-img-4");
const carouselImg5 = document.querySelector("#carousel-img-5");

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

getTopFive();
