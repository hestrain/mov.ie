 
//   //try for OTT API
//   function getOTT (movieId) {
//     //url for OTT API
//     const ottUrl = `https://streaming-availability.p.rapidapi.com/shows/search/${movieId}&show_type=movie&output_language=en`;
//     const ottOptions = {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': 'dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd',
//         'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
//       }
//     };
//     fetch(ottUrl, ottOptions)
//     .then(function (response) {
//     return response.json();
//   })
//   .then(function (services) {
//     console.log(" STREAM INFO \n----------");
//     console.log(services);
//     // TODO: Loop through the response
//     // for (const movie of movies) {
//     //   console.log(movie.imdbid);
//     //   console.log(movie.title);
//     //   console.log(movie.releaseYear);
//     //   for (const service of movie.streamingOptions.us) {
//     //    if (service.type == "suscription") {
//     //    console.log(service.link);
//     //    console.log(service.service.id);
//     //    } 
//     //   }
//     // }
//   });
// }

// Code for Carousel
document.addEventListener('DOMContentLoaded', function () {
  const carouselElement = document.getElementById('default-carousel');

  const items = [
      { position: 0, el: carouselElement.querySelector('[data-carousel-item]:nth-child(1)') },
      { position: 1, el: carouselElement.querySelector('[data-carousel-item]:nth-child(2)') },
      { position: 2, el: carouselElement.querySelector('[data-carousel-item]:nth-child(3)') },
      { position: 3, el: carouselElement.querySelector('[data-carousel-item]:nth-child(4)') },
      { position: 4, el: carouselElement.querySelector('[data-carousel-item]:nth-child(5)') }
  ];

  const options = {
      defaultPosition: 0,
      interval: 3000,
      indicators: {
          activeClasses: 'bg-white dark:bg-gray-800',
          inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
          items: [
              { position: 0, el: carouselElement.querySelector('[data-carousel-slide-to="0"]') },
              { position: 1, el: carouselElement.querySelector('[data-carousel-slide-to="1"]') },
              { position: 2, el: carouselElement.querySelector('[data-carousel-slide-to="2"]') },
              { position: 3, el: carouselElement.querySelector('[data-carousel-slide-to="3"]') },
              { position: 4, el: carouselElement.querySelector('[data-carousel-slide-to="4"]') }
          ]
      },
      onNext: () => {
          console.log('next slider...');
      },
      onPrev: () => {
          console.log('previous slider...');
      },
      onChange: (position) => {
          console.log(`changed to slider ${position}`);

      }
  };

  const carousel = new Carousel(carouselElement, items, options);


  // Event listeners for controls
  carouselElement.querySelector('[data-carousel-prev]').addEventListener('click', () => {
      carousel.prev();
  });
  carouselElement.querySelector('[data-carousel-next]').addEventListener('click', () => {
      carousel.next();
  });
});
