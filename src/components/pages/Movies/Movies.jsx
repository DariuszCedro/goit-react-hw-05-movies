import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import { useEffect } from 'react';
import css from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title') ?? '';
  const apiKey = process.env.REACT_APP_API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjZjNWEzMDUzOWIyNWQ2NGMyZjMwZWU3NTcxNDBhYSIsInN1YiI6IjY1MTU1OWE3ZWE4NGM3MDBjYTA2MzBmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FwLcqT6vmI1pVtpiCh05oXJVCAZQxvIbvFTx0sGIUxw`,
    },
  };

  async function fetchMovies() {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then(response => response.json())
      .then(response => setMovies(response.results))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleClick = e => {
    e.preventDefault();

    fetchMovies();
  };

  const updateQueryString = title => {
    const nextParams = title !== '' ? { title } : {};
    setSearchParams(nextParams);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movie title..."
        value={title}
        onChange={e => updateQueryString(e.target.value)}
        className={css.search_input}
      />
      <button type="submit" onClick={handleClick} className={css.search_button}>
        Search
      </button>

      <MovieList movies={movies} title={title} />
    </div>
  );
};
export default Movies;
