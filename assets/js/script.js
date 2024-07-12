
const requestUrl =
  "https://ott-details.p.rapidapi.com/search?title=Endgame&page=1'";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (issues) {
    console.log("Github Repo Issues \n----------");
    console.log(issues);
    // TODO: Loop through the response
    for (const issue of issues) {
      console.log(issue.html_url);
      console.log(issue.user.login);
    }
  });