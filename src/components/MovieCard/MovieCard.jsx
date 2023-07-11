import React from "react";
import Cookies from "js-cookie";

const MovieCard = ({ props }) => {
  const imgUrl = `http://localhost:8000/uploads/movies/img/${props.coverImage}`;

  const openMovie = () => {
    Cookies.set("oneMovie", JSON.stringify(props));
    const cookie = JSON.parse(Cookies.get("oneMovie"));
    window.location.href = "/movie";
  };

  const divStyle = {
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "300px",
    height: "300px",
  };

  return (
    <div className="movieCard" onClick={openMovie} style={divStyle}>
      <h2>{props.title}</h2>
    </div>
  );
};

export default MovieCard;
