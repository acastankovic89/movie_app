import React, {useState} from 'react'
import Carousel from "react-simply-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import MovieCard from '../MovieCard/MovieCard';

const ItemsCarousel = ({movies}) => {
    const [activeSlide, setActiveSlide] = useState(0);

    

    return (
        <Carousel
                containerProps={{
                  style: {
                    width: "100%",
                    height: "360px",
                    justifyContent: "space-around",
                    alignItems: "center",
                    userSelect: "none",
                  },
                }}
                preventScrollOnSwipe
                swipeTreshold={60}
                activeSlideIndex={activeSlide}
                activeSlideProps={{
                  style: {
                    background: "transparent",
                  },
                }}
                onRequestChange={setActiveSlide}
                forwardBtnProps={{
                  children: <FontAwesomeIcon icon={faChevronRight} />,
                  style: {
                    width: 60,
                    height: 60,
                    minWidth: 60,
                    alignSelf: "center",
                    color: "#fff",
                    background: "transparent",
                    border: "none",
                    fontSize: "45px",
                  },
                }}
                backwardBtnProps={{
                  children: <FontAwesomeIcon icon={faChevronLeft} />,
                  style: {
                    width: 60,
                    height: 60,
                    minWidth: 60,
                    alignSelf: "center",
                    color: "#fff",
                    background: "transparent",
                    border: "none",
                    fontSize: "45px",
                  },
                }}
                itemsToShow={5}
                speed={400}
                centerMode
              >
                {movies &&
                  movies.map((item, index) => (
                    <div key={index}>
                      <MovieCard props={item} />
                    </div>
                  ))}
              </Carousel>
    )
}

export default ItemsCarousel