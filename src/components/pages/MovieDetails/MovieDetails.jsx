import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjZjNWEzMDUzOWIyNWQ2NGMyZjMwZWU3NTcxNDBhYSIsInN1YiI6IjY1MTU1OWE3ZWE4NGM3MDBjYTA2MzBmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FwLcqT6vmI1pVtpiCh05oXJVCAZQxvIbvFTx0sGIUxw',
    },
  };

  useEffect(() => {
    async function fetchTrend() {
      const trend = await fetch(
        'https://api.themoviedb.org/3/movie/movie_id?language=en-US',
        options
      )
        .then(response => response.json())
        .then(response => setTrendingMovies(response.results))
        .catch(error => console.log(error));
    }
    fetchTrend();
  }, []);
  console.log(trendingMovies);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title || movie.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
