//movie title variable for both APIs
const movieTitle = "thegodfather";
//this seems to be my api key for both APIs as well
const apiKey = 'dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd';

//url for IMDB API
const imdbUrl = `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${moveTitle}.json`;
//additional options for IMDB API
const imdbOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd',
		'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
	}
};

//this try is for the IMDB API.
//can we have 2 try functions? we have not looked at these yet in bootcamp but its what Rapid API has when you copy their Javascript API scripts.
try {
  const response = await fetch(imdbUrl, imdbOptions);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

//url for OTT API
const ottUrl =`https://ott-details.p.rapidapi.com/search?title=${movieTitle}&page=1`;
//additional options for OTT API
const ottOptions= {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'dd3c89b192msh09ded43b9ec2715p10f2ffjsn7c51696fc6bd',
		'x-rapidapi-host': 'ott-details.p.rapidapi.com'
	}
};

//try for OTT API
try {
	const response = await fetch(imdbUrl, imdbOptions);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

