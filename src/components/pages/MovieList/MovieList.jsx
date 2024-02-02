import { Link, useSearchParams, useLocation } from 'react-router-dom';

export const MovieList = ({ movies, title }) => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
