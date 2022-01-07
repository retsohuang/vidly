import React from "react";
import { Link, useParams } from "react-router-dom";

export default function MovieForm() {
  const params = useParams();

  return (
    <>
      <h1>Movie Form {params.movieId}</h1>
      <Link to="/movies" className="btn btn-primary btn-sm">
        Save
      </Link>
    </>
  );
}
