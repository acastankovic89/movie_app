
import "./GetStartded.css";
import logo from "../../assets/img/logo (3).png";

const GetStarted = () => {
  return (
    <>
      <div className="homePageWrapper">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="signInWrapper">
            <button>Sign in</button>
          </div>
        </div>
        <div className="getStartedSection">
          <div className="descWraper">
            <h1>Unlimited movies, TV shows, and more</h1>
            <p>Ready to watch?</p>
            <a href="/home">Watch Now</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
