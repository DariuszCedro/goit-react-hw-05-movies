import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Cast = ({ apiKey }) => {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    async function fetchCredits() {
      await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      )
        .then(response => response.json())
        .then(response => setMovieCast(response.cast))
        .catch(error => console.log(error));
    }
    fetchCredits();
  });

  return (
    <div>
      <h2>Cast</h2>
      {movieCast.map(actor => (
        <li key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt=""
          ></img>
          <h4>{actor.name}</h4>
          <p>{actor.character}</p>
        </li>
      ))}
    </div>
  );
};
