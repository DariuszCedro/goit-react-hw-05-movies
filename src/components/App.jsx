import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Movies } from './pages/Movies/Movies';
import { MovieDetails } from './pages/MovieDetails/MovieDetails';
import { Cast } from './pages/Cast/Cast';
import { Reviews } from './pages/Reviews/Reviews';
import css from './App.module.css';
// const Home = React.lazy(() => import('./pages/Home/Home'));
// const Movies = React.lazy(() => import('./pages/Movies/Movies'));
// const MovieDetails = React.lazy(() =>
//   import('./pages/MovieDetails/MovieDetails')
// );
// const Cast = React.lazy(() => import('./pages/Cast/Cast'));
// const Reviews = React.lazy(() => import('./pages/Reviews/Reviews'));
// const Trending = React.lazy(() => import('./pages/Trending/Trending'));
// const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

export const App = () => {
  const apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjZjNWEzMDUzOWIyNWQ2NGMyZjMwZWU3NTcxNDBhYSIsInN1YiI6IjY1MTU1OWE3ZWE4NGM3MDBjYTA2MzBmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FwLcqT6vmI1pVtpiCh05oXJVCAZQxvIbvFTx0sGIUxw';

  return (
    <>
      <header className="app_header">
        <nav className="app_nav">
          <ul className="app_ul">
            <li className="app_li">
              <Link to="/">Home</Link>
            </li>
            <li className="app_li">
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home apiKey={apiKey} />} />
        <Route path="/movies" element={<Movies apiKey={apiKey} />} />
        <Route
          path="/movies/:movieId"
          element={<MovieDetails apiKey={apiKey} />}
        >
          <Route path="cast" element={<Cast apiKey={apiKey} />} />
          <Route path="reviews" element={<Reviews apiKey={apiKey} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
