import React, { useState, useEffect } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default function Movies() {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setGenres(genres);
    setAllMovies(getMovies());
  }, []);

  if (allMovies.length === 0) {
    return <p>There are no movies in the database.</p>;
  }

  const filteredMovies = selectedGenre?._id
    ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
    : allMovies;

  const sortedMovies = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );

  const movies = paginate(sortedMovies, currentPage, pageSize);

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={genre => {
            setCurrentPage(1);
            setSelectedGenre(genre);
          }}
        />
      </div>
      <div className="col">
        <p>Showing {filteredMovies.length} movies in the database.</p>
        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onLike={movie => {
            const movies = [...allMovies];
            const index = movies.indexOf(movie);
            movies[index] = { ...movies[index] };
            movies[index].liked = !movies[index].liked;
            setAllMovies(movies);
          }}
          onDelete={movie => {
            const { _id } = movie;
            const movies = allMovies.filter(movie => movie._id !== _id);
            setAllMovies(movies);
          }}
          onSort={setSortColumn}
        />
        <Pagination
          currentPage={currentPage}
          itemsCount={filteredMovies.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
