import React, { Component } from "react";
import _ from "lodash";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortedColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Movies" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((c) => c._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    //movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (item) => {
    this.setState({ selectedGenre: item, currentPage: 1 });
  };

  handleSort = (sortedColumn) => {
    this.setState({ sortedColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      sortedColumn,
      selectedGenre,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filtered,
      [sortedColumn.path],
      [sortedColumn.order]
    );
    const movies = paginate(sorted, currentPage, pageSize);

    if (allMovies.length === 0) return <h1>No Movies Here!</h1>;

    return (
      <React.Fragment>
        <h2>
          Showing{" "}
          <span style={{ color: "green" }}>{this.state.movies.length} </span>{" "}
          Movies To You <span style={{ color: "purple" }}>:)</span>{" "}
        </h2>

        <div className="row">
          <div className="col-3">
            <ListGroup
              selectedItem={selectedGenre}
              items={genres}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <div className="container">
              <MoviesTable
                movies={movies}
                sortedColumn={sortedColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />

              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
