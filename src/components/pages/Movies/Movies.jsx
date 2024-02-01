import axios from 'axios';

export const Movies = ({ apiKey }) => {
  return (
    <input
      type="text"
      placeholder="Search movie title..."
      // value={searchTerm}
      // onChange={e => setSearchTerm(e.target.value)}
      className="search-input"
    />
  );
};
