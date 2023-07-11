import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import './PlayMovie.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Cookies from 'js-cookie';

const PlayMovie = ({oneMovie}) => {

    const [movieIsOnList, setMovieIsOnList] = useState(false)

    const user = JSON.parse(Cookies.get('response'))
    

    const checkIsMovieAlreadyOnList = async() => {
        const checkUser = await axios.get(`http://localhost:8000/user/${user.id}`)
        const array =  checkUser.data.response.movies
        const foundObject = checkUser.data.response.movies.find(obj => obj.id === oneMovie.id);
        if (foundObject) {
            console.log("Object exists in the array.");
            setMovieIsOnList(true)
          } else {
            console.log("Object does not exist in the array.");
          }
        
    }

    useEffect(()=> {
        checkIsMovieAlreadyOnList()
    }, [])

    const saveMovieToUser = async () => {
        const movie = await axios.post('http://localhost:8000/user/addMovie', [oneMovie, user])
        window.location.reload();
    }

    const removeFromMyList = async() => {
        const movie = await axios.post('http://localhost:8000/user/removeMovie', [oneMovie, user])
        window.location.reload();
    }

    const handleGoBack = () => {
        window.history.back()
    }

    function extractVideoId(url) {
        const regex = /[?&]v=([^&#]*)/;
        const match = regex.exec(url);
        return match && match[1] ? match[1] : '';
      }

    const videoId = extractVideoId(oneMovie.trailer);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 0,
          modestbranding: 0,
          showinfo: 0,
          fs: 0,
          rel: 0,
          iv_load_policy: 3,
          mute: 1,
        },
      };
    return(
        <div className="tralerBackground">
            <YouTube videoId={videoId} opts={opts} />
            <div className='movieDesc' >
                <div className='previousPage '>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleGoBack} />
                </div>
                <h1>{oneMovie.title}</h1>
                <div className='closerDesc'>
                    <p>{oneMovie.publishYear}</p>
                    <p>{oneMovie.duration}</p>
                    <p>{oneMovie.ageRestriction}+</p>
                    <p>{oneMovie.category}</p>
                </div>
                <div className='synopsis'>
                    <p>{oneMovie.synopsis}</p>
                </div>
                <div className='cast'>
                    <p>{oneMovie.cast}</p>
                </div>
                <div className='buttons'>
                    <button className=' red btn logIn '>Play</button>
                    {movieIsOnList ? (
                        <button onClick={removeFromMyList} className='white  btn logIn '>Remove from my list</button>
                    ): (<button onClick={saveMovieToUser} className='white  btn logIn '>Add to My List</button>) }
                </div>
                
            </div>
        </div>
    )
}

export default PlayMovie