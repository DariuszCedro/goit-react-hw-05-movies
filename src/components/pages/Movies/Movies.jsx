import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export const Movies = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjZjNWEzMDUzOWIyNWQ2NGMyZjMwZWU3NTcxNDBhYSIsInN1YiI6IjY1MTU1OWE3ZWE4NGM3MDBjYTA2MzBmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FwLcqT6vmI1pVtpiCh05oXJVCAZQxvIbvFTx0sGIUxw`,
    },
  };

  const handleClick = () => {
    async function fetchMovies() {
      const fetchedMovies = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then(response => response.json())
        .then(response => setMovies(response.results))
        .catch(error => console.log(error));
      console.log(movies);
    }
    fetchMovies();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movie title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={handleClick} className="search-button">
        Search
      </button>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title || movie.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
