import React, { useState } from "react"

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
                    <div className="card" key={movie.id}>
                        <img className="card--image"
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                            alt={movie.title + ' poster'}
                        />

                        <div className="card--content">
                            <h3 className="card--title">{movie.title}</h3>
                            <p><small>RELEASE DATA: {movie.release_data}</small></p>
                            <p><small>RATING: {movie.vote_average}</small></p>
                            <p className="card--desc">{movie.overview}</p>

                        </div>


                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchMovies