import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';

export const MovieDetails = ({ apiKey }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { movieId, prevPath } = useParams();
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    async function fetchDetails() {
      const details = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      )
        .then(response => response.json())
        .then(response => setMovieDetails(response))
        .catch(error => {
          console.log(error);
        });
    }
    fetchDetails();
  }, []);

  const goBack = () => {
    navigate(prevPath || '/movies');
  };

  return (
    <div>
      <button className="MovieDetails_goBack" onClick={goBack}>
        Go Back
      </button>
      <img
        src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
      ></img>
      <h2>{movieDetails.title}</h2>
      <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>
      <h3>Overview</h3>
      <p>{movieDetails.overview}</p>

      <div>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};
