import React, { useState } from "react"

import MovieCard from "./MovieCard"

function Movie() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);


    const SearchMovies = async (event) => {
        event.preventDefault();
        //console.log("submitting")

        const query = "Legally Blonde"

        const url = `https://api.themoviedb.org/3/search/movie?api_key=f5a8eb46d22c977d682b2a697a3ed561&language=en-US&query=${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url);
            const data = await res.json();
            //console.log(data)
            setMovies(data.results);
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <div>
            <form className="form">
                <label
                    className="label"
                    htmlFor="query"
                    onSubmit={SearchMovies}>Movie Name</label>

                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="i.e. Legally Blonde"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} />


                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </div>
    )
}

export default SearchMovies