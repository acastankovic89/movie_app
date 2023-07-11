import axios from "axios";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "./AddMovie.css";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [movieTrailer, setMovieTrailer] = useState("");
  const [movieCast, setMovieCast] = useState("");
  const [moviePublishingYear, setMoviePublishingYear] = useState(null);
  const [durationHour, setDurationHour] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const duration = durationHour + "h" + durationMinutes + "m";
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [category, setCategory] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    onFileUpload();
    try {
      const response = await axios.post("http://localhost:8000/movies", {
        title: title,
        trailer: movieTrailer,
        cast: movieCast,
        publishYear: moviePublishingYear,
        duration: duration,
        ageRestriction: ageRestriction,
        synopsis: synopsis,
        coverImage: selectedFile.name,
        category: category,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);

    // Details of the uploaded file

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // Request made to the backend api
    // Send formData object
    const response = await axios.post(
      "http://localhost:8000/file-upload",
      formData,
      config
    );
  };

  const handeleMovieTitle = (event) => {
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
    setCategory(event.target.value);
  };

  const currentYear = new Date().getFullYear();

  return (
    <form onSubmit={handleSubmit}>
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
        Add movie
      </button>
    </form>
  );
};

export default AddMovie;
