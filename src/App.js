import React, {useEffect, useState} from "react";
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const API_URL='http://www.omdbapi.com?apikey=e1790b79';

// const movie1={
//     "Title": "The Office",
//     "Year": "2005–2013",
//     "imdbID": "tt0386676",
//     "Type": "series",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg"
// }

const App=()=>{
    const [movies, setMovies]=useState([]);
    const [searchTerm, setSearchTerm]=useState("");

    const searchMovies=async(title)=>{
        const response=await fetch(`${API_URL}&s=${title}`);
        const data=await response.json();
        setMovies(data.Search);
    }
    useEffect(()=>{
        searchMovies('Office');
    },[]);

    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                />
                <img 
                    src={SearchIcon} 
                    alt="Search"
                    onClick={()=>{searchMovies(searchTerm)}}
                />
            </div>
            {movies?.length>0?
                (<div className="container">
                    {movies.map((movie)=>{
                        return <MovieCard movie={movie}/>
                    })}
                </div>) :
                (<div className="empty">
                    <h2>No Movies Found</h2>
                </div>)}
            {/* <div className="container">
                <MovieCard movie1={movies[0]}/>
            </div> */}
        </div>
    );
}

export default App;