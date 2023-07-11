import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './AdvertiseCarousel.css';
import Cookies from "js-cookie";


const AdvertiseCarousel = ({props}) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const openMovie = (item) => {
      setSelectedMovie(item)
      Cookies.set('oneMovie',JSON.stringify(item));
      window.location.href = "/movie";
  }
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      if (e && e.direction) {
        setDirection(e.direction);
      }
    };
  
    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % props.length);
          setDirection('next');
        }, 30000); // Change slide every 30 seconds
        
        return () => clearInterval(interval);
      }, []);
  
    return (
      <Carousel fade activeIndex={index} direction={direction} onSelect={handleSelect}>
        {props.map((item) => (
          <Carousel.Item key={item.id}>
            
            <div className='descCarousel'>
              <h3>{item.title}</h3>
              <div className='closerDesc'>
                    <p>{item.publishYear}</p>
                    <p>{item.duration}</p>
                    <p>{item.ageRestriction}+</p>
                    <p>{item.category}</p>
              </div>
              <div className='synopsis'>
              <p>{item.synopsis}</p>
              </div>
              <div className='cast'>
                    <p>{item.cast}</p>
                </div>
                <div className='buttons'>
                    <button onClick={()=>openMovie(item)} className=' red btn logIn '>Play</button>
                </div>
              
            </div>
            <img className="d-block w-100" src={`http://localhost:8000/uploads/movies/img/${item.coverImage}`} alt={item.title} />
            
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };
  
  export default AdvertiseCarousel