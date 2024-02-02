import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const apiKey = process.env.REACT_APP_API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    async function fetchDetails() {
      await fetch(
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

  return (
    <>
      <div className={css.details_container}>
        <Link to={location.state?.from ?? '/movies'}>
          <button className={css.button_back}>GO BACK</button>
        </Link>
        <div className={css.movie_description}>
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
            alt=""
          ></img>
          <div>
            <h2>{movieDetails.title}</h2>
            <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
        <div className={css.details_additional}>
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
    </>
  );
};
export default MovieDetails;
