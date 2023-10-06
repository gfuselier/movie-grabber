
var omdbKey = "dcd25d25"
var tmdKey = "91ce5d26720f6e04f0cc120d15c7cd71"

var button = document.getElementById("search-button")
var search = document.getElementById("input")
var displayPoster = document.getElementById("display-poster")
var displayTitle = document.getElementById("display-title")
var displayDescription = document.getElementById("display-description")

var createWatchlistInput = document.getElementById("create-watchlist-input")
var createWatchlistButton = document.getElementById("create-watchlist-button")
var userWatchlist = document.getElementById("user-watchlists")

var searchBtn = document.querySelector("button")
var inputBox = document.getElementById("input")
var movieData = document.getElementById("movie-info")


// this function persists the watchlist data on page load
function loadLocalStorageWatchlist() {
  var generatedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || []
  for (let i = 0; i < generatedWatchlist.length; i++) {
    var newWatchlist = document.createElement("li")
    newWatchlist.textContent = generatedWatchlist[i]
    userWatchlist.append(newWatchlist)
  }
}

loadLocalStorageWatchlist()

// on click, you can add a watchlist 
createWatchlistButton.addEventListener("click", addWatchlist)

function addWatchlist() {
  var watchlist = []
  var localStorageWatchlist = JSON.parse(localStorage.getItem("watchlist"))
  if (localStorageWatchlist?.length > 0) {
    localStorageWatchlist.push(createWatchlistInput.value)
    localStorage.setItem("watchlist", JSON.stringify(localStorageWatchlist))
  }
  else {
    watchlist.push(createWatchlistInput.value)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }
  var generatedWatchlist = JSON.parse(localStorage.getItem("watchlist"))
  // for (let i = 0; i < generatedWatchlist.length; i++) {
  var newWatchlist = document.createElement("li")
  newWatchlist.textContent = createWatchlistInput.value
  userWatchlist.append(newWatchlist)
  // }
}

// this function generates cards for the results of the movie database search
function generateMovieCards(moviebData) {
  for (let i = 0; i < 10; i++) {

    movieTitle = moviebData[i].title
    movieInfo = moviebData[i].overview
    moviePoster = moviebData[i].poster_path

    var movieData = document.getElementById("movie-info")

    var card = document.createElement("div")
    card.setAttribute("class", "column is-full card is-horizontal my-2")

    var cardDiv = document.createElement("div")
    cardDiv.setAttribute("class", "card-image")

    movieImg = document.createElement("img")
    movieImg.setAttribute("src", "https://image.tmdb.org/t/p/original/" + moviePoster)

    var stackedDiv = document.createElement("div")
    stackedDiv.setAttribute("class", "card-stacked")

    var newTitle = document.createElement("h3")


    var hr = document.createElement("hr")

    var newDescription = document.createElement("p")

    newTitle.textContent = movieTitle
    newDescription.textContent = "Overview: " + movieInfo
    /* var cardContainer = document.getElementById("movie-info")
    cardContainer.append(card)  */

    var dropdown = document.createElement("select")
    dropdown.setAttribute("style", "width: 20%")

    //stackedDiv.append(dropdown)


    card.append(movieImg)

    var addButton = document.createElement("button")
    addButton.textContent = "Add to selected watchlist"
    addButton.setAttribute("class", "button is-rounded ml-2")
    addButton.setAttribute("style", "width: 20%")
    // stackedDiv.append(addButton)

    newTitle.append(hr)
    stackedDiv.append(newTitle, newDescription, addButton, dropdown)
    cardDiv.append(movieImg)
    card.append(cardDiv, stackedDiv)
    //console.log(movieData);
    movieData.append(card)
    //Can edit CSS of movie cards when they are created here. Replace "style" with "class" or "id", and padding with the classes or ids you want to add
    // card.setAttribute("style", "padding:15px")
  }
}

// this function is the fetch request for the movie database
function fetchSpecificMovie() {
  var userInput = inputBox.value.trim()
  //console.log(userInput);
  fetch('https://api.themoviedb.org/3/search/movie?query=' + userInput + '&api_key=91ce5d26720f6e04f0cc120d15c7cd71')
    .then(response => response.json())
    .then(function (moviebData) {
      console.log(moviebData);
      generateMovieCards(moviebData.results)
      //generateCard(movieData.results);
    })
}

// this function is the fetch request for OMDB
function findMovie(searchInput) {
  var omdbUrl = "https://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + searchInput;
  fetch(omdbUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      omdDataTitle = data.Title

      var card = document.createElement("div")
      card.setAttribute("class", "column is-full card is-horizontal")

      var cardDiv = document.createElement("div")
      cardDiv.setAttribute("class", "card-image")

      var poster = document.createElement("img")

      var stackedDiv = document.createElement("div")
      stackedDiv.setAttribute("class", "card-stacked")

      var title = document.createElement("h3")
      var hr = document.createElement("hr")
      var director = document.createElement("p")
      var description = document.createElement("p")
      var genres = document.createElement("p")
      var rating = document.createElement("p")

      title.textContent = omdDataTitle + " (" + data.Year + ")"
      director.textContent = "Director: " + data.Director
      poster.setAttribute("src", data.Poster)
      description.textContent = "Overview: " + data.Plot
      genres.textContent = "Genres: " + data.Genre
      rating.textContent = "Rating: " + data.Rated

      var addButton = document.createElement("button")
      addButton.textContent = "Add to selected watchlist"
      addButton.setAttribute("class", "button is-rounded ml-2")
      addButton.setAttribute("style", "width: 20%")

      var dropdown = document.createElement("select")
      dropdown.setAttribute("style", "width: 20%")

      title.append(hr)
      stackedDiv.append(title, genres, description, addButton, dropdown)
      cardDiv.append(poster)
      card.append(cardDiv, stackedDiv)
      movieData.append(card)

    })
}

// this adds the event listener to the search button. So on click, the fetch requests will run
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var searchInput = inputBox.value.trim();
  findMovie(searchInput);
  fetchSpecificMovie(searchInput);

})
