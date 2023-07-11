import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Calendar from "react-calendar";

const UpdatedMovie = () => {
  const [title, setTitle] = useState("");
  const [movieTrailer, setMovieTrailer] = useState("");
  const [movieCast, setMovieCast] = useState("");
  const [moviePublishingYear, setMoviePublishingYear] = useState(null);
  const [durationHour, setDurationHour] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const duration = durationHour + "h" + durationMinutes + "m";
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("");
  const [allMovies, setAllMovies] = useState();
  const [movieId, setMovieId] = useState();
  const [oneMovie, setOneMovie] = useState("");

  const getAllMovies = async () => {
    try {
      const allMovies = await axios.get("http://localhost:8000/movies");
      setAllMovies(allMovies.data.response);
    } catch (error) {
      if (error) throw error;
    }
  };

  useEffect(() => {
    getOneMovie();
    setTitle(oneMovie.title);
  }, [movieId]);

  useEffect(() => {
    setTitle(oneMovie.title ? oneMovie.title : "");
    setMovieTrailer(oneMovie.trailer);
    setMovieCast(oneMovie.cast);
    setMoviePublishingYear(oneMovie.publishYear);
    setAgeRestriction(oneMovie.ageRestriction);
    setSynopsis(oneMovie.synopsis);
    setCategory(oneMovie.category);
    const duration = oneMovie.duration;
    if (duration) {
      const durHours = duration.slice(0, 1);
      setDurationHour(durHours);
      const durMinutes = duration.slice(2, 4);
      setDurationMinutes(durMinutes);
    }
  }, [oneMovie]);

  const getOneMovie = async () => {
    try {
      if (movieId) {
        const oneMovie = await axios.get(
          `http://localhost:8000/movies/${movieId}`
        );
        setOneMovie(oneMovie.data.response);
      }
    } catch (error) {
      if (error) throw error;
    }
  };

  const handleMovieSelect = (event) => {
    setMovieId(event.target.value);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      onFileUpload();
    }
    try {
      const response = await axios.put("http://localhost:8000/movies", {
        id: movieId,
        title: title,
        trailer: movieTrailer,
        cast: movieCast,
        publishYear: moviePublishingYear,
        duration: duration,
        ageRestriction: ageRestriction,
        synopsis: synopsis,
        coverImage: selectedFile?.name || "",
        category: category,
      });
      console.log("response", response.data);
      if (response.data.status === 200) {
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0] || null);
  };

  const onFileUpload = async () => {
    if (selectedFile) {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      const fileName = selectedFile.name ? selectedFile.name : "";
      formData.append("myFile", selectedFile, fileName);

      // Details of the uploaded file

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://localhost:8000/file-upload",
        formData,
        config
      );
    }
  };

  const handeleMovieTitle = (event) => {
    console.log("ressssssggg", event.target.value);
    setTitle(event.target.value);
  };

  const handeleMovieTrailer = (event) => {
    setMovieTrailer(event?.target.value);
  };

  const handeleMovieCast = (event) => {
    setMovieCast(event?.target.value);
  };

  const handleYearChange = (date) => {
    setMoviePublishingYear(date.getFullYear());
  };

  const handleDurationHour = (event) => {
    setDurationHour(event.target.value);
  };

  const handleDurationMinutes = (event) => {
    setDurationMinutes(event.target.value);
  };

  const handleAgeRestriction = (event) => {
    setAgeRestriction(event.target.value);
  };

  const handeleSynopsis = (event) => {
    setSynopsis(event.target.value);
  };

  const handeleCategory = (event) => {
    if (oneMovie.category === event.target.value) {
      setCategory(oneMovie.category);
    } else {
      setCategory(event.target.value);
    }
  };

  const currentYear = new Date().getFullYear();

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
      <input
        type="text"
        name="title"
        className={"formInput logIn black"}
        value={title}
        placeholder="Movie Title"
        onChange={handeleMovieTitle}
      />
      <input
        type="text"
        name="adminEmail"
        className={"formInput logIn black"}
        value={movieTrailer}
        placeholder="Trailer link"
        onChange={handeleMovieTrailer}
      />
      <textarea
        name="movieCast"
        className="formInput logIn black"
        value={movieCast}
        placeholder="Cast"
        onChange={handeleMovieCast}
      ></textarea>
      <p style={{ width: "80%", color: "#fff" }}>Movie publish year</p>
      <Calendar
        onChange={handleYearChange}
        value={moviePublishingYear ? new Date(moviePublishingYear, 0, 1) : null}
        defaultValue={null}
        defaultView="decade"
        maxDetail="decade"
        maxDate={new Date(currentYear, 11, 31)}
        showNeighboringMonth={false}
        showFixedNumberOfWeeks
        minDetail="decade"
      />
      <div className="durationInput">
        <p>Movie Duration</p>
        <p>Hour:</p>
        <input
          type="number"
          name="hour"
          className={"formInput logIn black"}
          id="hour"
          value={durationHour}
          onChange={handleDurationHour}
        />
        <p>Minutes:</p>
        <input
          type="number"
          name="minutes"
          className={"formInput logIn black"}
          id="minutes"
          value={durationMinutes}
          onChange={handleDurationMinutes}
        />
      </div>
      <input
        type="number"
        name="ageRestriction"
        className={"formInput logIn black"}
        id="ageRestriction"
        value={ageRestriction}
        onChange={handleAgeRestriction}
        placeholder="Age restriction"
      />
      <p style={{ width: "80%", color: "#fff" }}>Upload cover image:</p>
      <input type="file" onChange={onFileChange} />
      <p style={{ width: "80%", color: "#fff" }}>Synopsis:</p>
      <textarea
        name="synopsis"
        className="formInput logIn black"
        value={synopsis}
        placeholder="Synopsis"
        onChange={handeleSynopsis}
      ></textarea>
      <p style={{ width: "80%", color: "#fff" }}>Movie category:</p>
      <select onChange={handeleCategory}>
        <option value={"Action"}>Action</option>
        <option value={"Comedy"}>Comedy</option>
        <option value={"Drama"}>Drama</option>
        <option value={"Fantasy"}>Fantasy</option>
        <option value={"Horror"}>Horror</option>
        <option value={"Mystery"}>Mystery</option>
        <option value={"Romance"}>Romance</option>
        <option value={"Thriller"}>Thriller</option>
      </select>
      <button className="red btn logIn" type="submit">
        Update movie
      </button>
    </form>
  );
};

export default UpdatedMovie;
