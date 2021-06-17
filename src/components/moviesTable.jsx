import React, { Component } from "react";
import Like from "../components/common/like";

class MoviesTable extends Component {
  raiseSort = (path) => {
    const sortedColumn = { ...this.props.sortedColumn };
    if (path === sortedColumn.path) {
      sortedColumn.order = sortedColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortedColumn.path = path;
      sortedColumn.order = "asc";
    }
    this.props.onSort(sortedColumn);
  };

  showSortIcon = (path) => {
    //
  };

  render() {
    const { movies, onLike, onDelete } = this.props;
    return (
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr style={{ cursor: "pointer" }}>
            <th onClick={() => this.raiseSort("title")}>
              Title{() => this.showSortIcon("title")}
            </th>
            <th onClick={() => this.raiseSort("genre.name")}>
              Genre{() => this.showSortIcon("genre.name")}
            </th>
            <th onClick={() => this.raiseSort("numberInStock")}>
              Stock{() => this.showSortIcon("numberInStock")}
            </th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>
              Rate{() => this.showSortIcon("dailyRentalRate")}
            </th>
            <th>{"< 3"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like onClick={() => onLike(movie)} liked={movie.liked} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger m-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
