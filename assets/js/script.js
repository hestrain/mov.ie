//movie title variable for both APIs
const movieTitle = `jumanji`;
//this seems to be my api key for both APIs as well
const apiKey = 'dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd';

//url for IMDB API
const imdbUrl = `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${movieTitle}.json`;
//additional options for IMDB API
const imdbOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd',
		'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
	}
};

//this try is for the IMDB API.
//can we have 2 try functions? we have not looked at these yet in bootcamp but its what Rapid API has when you copy their Javascript API scripts.}
fetch(imdbUrl, imdbOptions)
  .then(function (response) {
    return response.json();
  })
  .then(function (movies) {
    console.log("MOVIES FROM SEARCH \n----------");
    console.log(movies);
    // TODO: Loop through the response
    for (const movie of movies.d) {
      console.log(movie.y);
      console.log(movie.l);
      console.log(movie.i.imageUrl);
      const movieId = movie.id;

      getOTT(movieId);
    }

  });
  
  //try for OTT API
  function getOTT (movieId) {
    //url for OTT API
    const ottUrl = `https://streaming-availability.p.rapidapi.com/shows/search/${movieId}&show_type=movie&output_language=en`;
    const ottOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
      }
    };
    fetch(ottUrl, ottOptions)
    .then(function (response) {
    return response.json();
  })
  .then(function (services) {
    console.log(" STREAM INFO \n----------");
    console.log(services);
    // TODO: Loop through the response
    for (const movie of services) {
      console.log(movie.title);
      console.log(movie.releaseYear);
      for (const service of service.streamingOptions.us) {
       if (service.type == "suscription") {
       console.log(service.link);
       console.log(service.service.id);
       } 
      }
    }
  });
}


// <!--JAVASCRIPT CODE-->
var swiper = new Swiper(".progress-slide-carousel", {
loop: true,
fraction: true,
autoplay: {
  delay: 1200,
  disableOnInteraction: false,
},
pagination: {
  el: ".progress-slide-carousel .swiper-pagination",
  type: "progressbar",
},
});