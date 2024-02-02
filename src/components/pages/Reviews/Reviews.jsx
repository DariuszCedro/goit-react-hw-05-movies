import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Reviews = ({ apiKey }) => {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    async function fetchReviews() {
      await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
        options
      )
        .then(response => response.json())
        .then(response => setMovieReviews(response.results))
        .catch(error => console.log(error));
    }
    fetchReviews();
  });
  console.log(movieReviews);
  return (
    <div>
      <h2>Reviews</h2>
      {movieReviews.map(review => (
        <li key={review.id}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </div>
  );
};
