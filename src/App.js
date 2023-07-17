import React from 'react'
import { useEffect, useState } from 'react'
import './App.css';
import SearchIcon  from './search.svg'
import MovieCard from './MovieCard';


const apiKey = process.env.REACT_APP_ACCESS_KEY
const API_URL=`http://www.omdbapi.com/?apikey=${apiKey}`

const movie1={
  "Title": "Superman, Spiderman or Batman",
  "Year": "2011",
  "imdbID": "tt2084949",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
}



function App() {

  const [movies,setMovies]=useState();
  const [searchTerm, setSearchTerm] = useState("");
  
  const searchMovies= async(title)=>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

      //return data
      //console.log(data.Search);
      setMovies(data.Search);


  }

  useEffect(() =>{
    searchMovies('Spiderman');
  },[])

  return (
   <div className='app'>
    <h1>Movieland</h1>
    <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />

<img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
     
    </div>

    {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

     

   

   </div>
  )
}

export default App