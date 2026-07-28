const searchBtn = document.querySelector("#searchBtn")
let searchInput = document.querySelector("#searchInput")
let targetUrl = "https://www.omdbapi.com/?";
const APIKey = "b70fb34d"
const movieSection = document.querySelector("#movieResults")


// getting userInputS
let intervalId = 0;
function getUserInput(){
  let userInput = searchInput.value
  userInput = userInput.trim()

  if(userInput){
    return userInput
  }
  intervalId = setTimeout(()=>{
    searchInput.placeholder = "Enter a valid movie keyword"
    // console.log("Hi")
  },100)
}


// fetching movies 
async function fetchMovies(query){
  targetUrl += `apikey=${APIKey}&s=${query}`

  const response = await fetch(targetUrl)
  const data =  await response.json()

    // console.log(data)
  if(data.Response === "True"){
    displayMovieCards(data.Search)
  }
}


// display movie Cards
function displayMovieCards(movies){
  movies.forEach((movie)=>{

    const movieCard = document.createElement("div")
    movieCard.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    <button>Add to Favourites</button>
    `
    movieCard.classList = "movie-card"
    movieSection.appendChild(movieCard)
  })
}

// clearing the searchButton
let movieKeyword ;
searchBtn.addEventListener("click",()=>{
  movieKeyword = getUserInput()
  
  fetchMovies(movieKeyword)
})

