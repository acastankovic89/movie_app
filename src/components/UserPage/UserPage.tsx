import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./UserPage.css";
import ItemsCarousel from "../ItemsCarousel/ItemsCarousel";
import AdvertiseCarousel from "../AdvertiseCarousel/AdvertiseCarousel";
import UserMenu from "../UserMenu/UserMenu";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const UserPage = (props) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [all_Movies, setAllMovies] = useState<any>();
  const [comedyMovies, setComedyMovies] = useState<any>();
  const [thrillerMovies, setThrillerMovies] = useState<any>();
  const [fantasyMovies, setFantasyMovies] = useState<any>();
  const [romanceMovies, setRomanceMovies] = useState<any>();
  const [mysteryMovies, setMysteryMovies] = useState<any>();
  const [userMovies, setUserMovies] = useState<any>();
  const [user, setUser] = useState<any>();

  const getAllMovies = async () => {
    try {
      const allMovies = await axios.get("http://localhost:8000/movies");
      setAllMovies(allMovies.data.response);
    } catch (error) {
      throw error;
    }
  };

  const getThrillerMovies = async () => {
    try {
      const thrillerMovies = await axios.get(
        "http://localhost:8000/movies/thriler"
      );
      setThrillerMovies(thrillerMovies.data.response);
    } catch (error) {
      throw error;
    }
  };

  const getRomanceMovies = async () => {
    try {
      const movies = await axios.get("http://localhost:8000/movies/romance");
      setRomanceMovies(movies.data.response);
    } catch (error) {
      throw error;
    }
  };

  const getFantasyMovies = async () => {
    try {
      const movies = await axios.get("http://localhost:8000/movies/fantasy");
      setFantasyMovies(movies.data.response);
    } catch (error) {
      throw error;
    }
  };

  const getAllMysteryMovies = async () => {
    try {
      const movies = await axios.get("http://localhost:8000/movies/mystery");
      setMysteryMovies(movies.data.response);
    } catch (error) {
      throw error;
    }
  };

  const getComedyMovies = async () => {
    try {
      const movies = await axios.get("http://localhost:8000/movies/comedy");
      setMysteryMovies(movies.data.response);
    } catch (error) {
      throw error;
    }
  };

  // const apiMovies = async () => {
  //   for (let i = 100; i < 1000; i++) {
  //     const apiMovies = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${i}?api_key=5c837629b6484f2cac5eaf1b7762e874`
  //     );
  //     console.log("apimovies", apiMovies);
  //   }
  // };

  useEffect(() => {
    // apiMovies();
    getAllMovies();
    getComedyMovies();
    getThrillerMovies();
    getFantasyMovies();
    getRomanceMovies();
    getAllMysteryMovies();
    const token = Cookies.get("token");
    const userData = JSON.parse(Cookies.get("response") || "{}");
    setUser(userData);
    if (token) {
      setIsLogedIn(true);
    } else {
      window.location.href = "/userSignIn";
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user) {
        const getUserData = async () => {
          try {
            const checkUser = await axios.get(
              `http://localhost:8000/user/${user.id}`
            );
            setUserMovies(checkUser.data.response.movies);
          } catch (error) {
            throw error;
          }
        };
        getUserData();
      }
    }
  }, [user]);

  if (!isLogedIn) {
    return <LoadingScreen />;
  }

  return (
    <div className="userPage">
      <UserMenu />
      <div className="userPagewrapper">
        <div className="carouselWrapper">
          {all_Movies && all_Movies.length > 0 && (
            <AdvertiseCarousel props={all_Movies} />
          )}
        </div>
        <div className="title">
          {user && user.length > 0 && <h2>Welcome {user.firstName}</h2>}
        </div>
        <div className="moviesWrapper">
          <div className="title">
            <h2>My List</h2>
          </div>
          <div className="selectMovieWrapper">
            {userMovies?.length > 0 && <ItemsCarousel movies={userMovies} />}
          </div>
        </div>
        <div className="moviesWrapper">
          <div className="title">
            <h2>All Movies</h2>
          </div>
          <div className="selectMovieWrapper">
            {all_Movies && all_Movies.length > 0 && (
              <ItemsCarousel movies={all_Movies} />
            )}
          </div>
        </div>
        <div className="moviesWrapper">
          <div className="title">
            <h2>Commedy Movies</h2>
          </div>
          <div className="selectMovieWrapper">
            {comedyMovies && comedyMovies.length > 0 && (
              <ItemsCarousel movies={comedyMovies} />
            )}
          </div>
        </div>
        <div className="moviesWrapper">
          <div className="title">
            <h2>Fantasy Movies</h2>
          </div>
          <div className="selectMovieWrapper">
            {fantasyMovies && fantasyMovies.length > 0 && (
              <ItemsCarousel movies={fantasyMovies} />
            )}
          </div>
        </div>

        <div className="moviesWrapper">
          <div className="title">
            <h2>Thriller Movies</h2>
          </div>
          <div className="selectMovieWrapper">
            {thrillerMovies && thrillerMovies.length > 0 && (
              <ItemsCarousel movies={thrillerMovies} />
            )}
          </div>
        </div>
        <div className="moviesWrapper">
          <div className="title">
            <h2>Romance Movies</h2>
          </div>
          <div className="selectMovieWrapper">
            {romanceMovies && romanceMovies.length > 0 && (
              <ItemsCarousel movies={romanceMovies} />
            )}
          </div>
        </div>
        <div className="moviesWrapper">
          <div className="title">
            <h2>Mystery Movies</h2>
          </div>
          <div className="selectMovieWrapper">
            {mysteryMovies && mysteryMovies.length > 0 && (
              <ItemsCarousel movies={mysteryMovies} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
