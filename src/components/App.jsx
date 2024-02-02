import React, { lazy, Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import css from './App.module.css';
const Home = React.lazy(() => import('./pages/Home/Home'));
const Movies = React.lazy(() => import('./pages/Movies/Movies'));
const MovieList = React.lazy(() => import('./pages/MovieList/MovieList'));
const MovieDetails = React.lazy(() =>
  import('./pages/MovieDetails/MovieDetails')
);
const Cast = React.lazy(() => import('./pages/Cast/Cast'));
const Reviews = React.lazy(() => import('./pages/Reviews/Reviews'));
const Trending = React.lazy(() => import('./pages/Trending/Trending'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

export const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <>
      <header className={css.app_header}>
        <nav className="app_nav">
          <ul className={css.app_ul}>
            <li className="app_li">
              <Link to="/">HOME</Link>
            </li>
            <li className="app_li">
              <Link to="/movies">MOVIES</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home apiKey={apiKey} />} />
          <Route path="/movies" element={<Movies apiKey={apiKey} />} />
          <Route path="/movies/list" element={<MovieList apiKey={apiKey} />} />
          <Route
            path="/movies/:movieId"
            element={<MovieDetails apiKey={apiKey} />}
          >
            <Route path="cast" element={<Cast apiKey={apiKey} />} />
            <Route path="reviews" element={<Reviews apiKey={apiKey} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};
