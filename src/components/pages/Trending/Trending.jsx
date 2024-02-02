import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    async function fetchTrend() {
      await fetch(
        'https://api.themoviedb.org/3/trending/all/day?language=en-US',
        options
      )
        .then(response => response.json())
        .then(response => setTrendingMovies(response.results))
        .catch(error => console.log(error));
    }
    fetchTrend();
  });

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
export default Trending;
