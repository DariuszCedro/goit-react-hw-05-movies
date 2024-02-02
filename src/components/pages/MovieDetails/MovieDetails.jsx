import React, { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';

export const MovieDetails = ({ apiKey }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { movieId, prevPath } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [location]);
  console.log(location);

  return (
    <div>
      <Link to={location.state?.from ?? '/movies'}>
        <button className="MovieDetails_goBack">Go Back</button>
      </Link>
      <img
        src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
        alt=""
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
