import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Movies } from './pages/Movies/Movies';
import { MovieDetails } from './pages/MovieDetails/MovieDetails';
import { Trending } from './pages/Trending/Trending';
import { Cast } from './pages/Cast/Cast';
import { Reviews } from './pages/Reviews/Reviews';
// const Home = React.lazy(() => import('./pages/Home/Home'));
// const Movies = React.lazy(() => import('./pages/Movies/Movies'));
// const MovieDetails = React.lazy(() => import('./pages/MovieDetails/MovieDetails'));
// const Cast = React.lazy(() => import('./pages/Cast/Cast'));
// const Reviews = React.lazy(() => import('./pages/Reviews/Reviews'));
// const Trending = React.lazy(() => import('./pages/Trending/Trending'));

export const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

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
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies apiKey={apiKey} />} />
        {/* <Route path="/movies/:movieId" element={<MovieDetails />} /> */}
        <Route path="/movies/:movieId/cast" element={<Cast />} />
        <Route path="/movies/:movieId/reviews" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
