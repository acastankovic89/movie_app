import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteMovie = () => {
  const [allMovies, setAllMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  console.log("selectedMovie", selectedMovie);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    try {
      const allMovies = await axios.get("http://localhost:8000/movies");
      setAllMovies(allMovies.data.response);
    } catch (error) {
      if (error) throw error;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle");
    deleteMovie();
    window.location.reload();
  };

  const handleMovieSelect = (event) => {
    setSelectedMovie(event.target.value);
  };

  const deleteMovie = async () => {
    try {
      if (selectedMovie && selectedMovie.length > 0) {
        const deleteMovie = await axios.delete(
          `http://localhost:8000/movies/${selectedMovie}`
        );
        console.log("deletemovie", deleteMovie);
      }
    } catch (error) {
      if (error) throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={handleMovieSelect}>
        <option value="">Select a movie</option>
        {allMovies &&
          allMovies.length > 0 &&
          allMovies.map((movie, index) => {
            return (
              <option key={index} value={movie.id}>
                {movie.title}
              </option>
            );
          })}
      </select>
      <button className="red btn logIn" type="submit">
        Delete movie
      </button>
    </form>
  );
};

export default DeleteMovie;
