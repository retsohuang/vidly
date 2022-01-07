import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import NavBar from "./components/common/navBar";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="movies" replace />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId" element={<MovieForm />} />
            <Route path="customers" element={<Customers />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="not-found" replace />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
