const searchBtn = document.querySelector("#searchBtn")
let searchInput = document.querySelector("#searchInput")
let targetUrl = "https://www.omdbapi.com/?";
const APIKey = "b70fb34d"
const movieSection = document.querySelector("#movieResults")
const fav = document.querySelector("#favorites")

let favMovie = JSON.parse(localStorage.getItem("fav")) || [];

document.addEventListener("DOMContentLoaded", displayFav)

// getting userInput
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
  targetUrl = `https://www.omdbapi.com/?apikey=${APIKey}&s=${query}`

  const response = await fetch(targetUrl)
  const data =  await response.json()

    // console.log(data)
  if(data.Response === "True"){
    displayMovieCards(data.Search)
  }
}


// display movie Cards
function displayMovieCards(movies){

  movieSection.innerHTML = ""; 

  movies.forEach((movie)=>{

    const movieCard = document.createElement("div")
    movieCard.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    <button onClick="addToFav(
      '${movie.imdbID}',
      '${movie.Poster}', 
      '${movie.Title.replace("'", "\\"+"'")}', 
      '${movie.Year}')">
        Add to Favourites
    </button>
    `
    movieCard.className = "movie-card"
    movieSection.appendChild(movieCard)
  })
}

// implementimg remove from fav function 
function removeFromFav(id){
  favMovie = favMovie.filter(movie => movie.id != id)
  localStorage.setItem("fav", JSON.stringify(favMovie))
  displayFav()
}


// display fav movie cards
function displayFav(){

  fav.innerHTML = "";

  favMovie.forEach((movie)=>{

    const movieCard = document.createElement("div")
    movieCard.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.year}</p>
    <button onClick="removeFromFav('${movie.id}')">
        Remove
    </button>
    `
    movieCard.className = "movie-card"
    fav.appendChild(movieCard)
  })
}

// setting add to fav button  
function addToFav(id, poster, title, year){
  
  if(favMovie.some(movie => movie.id == id )){
    alert("Movie already exists in favourites!");
    return;
  }
  
  favMovie.push({id, poster, title, year})
  localStorage.setItem("fav", JSON.stringify(favMovie))
  displayFav()
}






// clearing the searchButton
let movieKeyword ;
searchBtn.addEventListener("click",()=>{
  movieKeyword = getUserInput()
  
  fetchMovies(movieKeyword)


})

