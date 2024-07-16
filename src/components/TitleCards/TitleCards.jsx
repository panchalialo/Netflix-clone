import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({title, category}) => {

  const[apiData, setApidata]= useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmE0NDNmNDZhOGYzNWI4MDIyNWY0ODMxZWVmY2EwOCIsIm5iZiI6MTcyMDY5MzMzMC4xMzc2OSwic3ViIjoiNjY4ZDRhMGI4MmI2MmVjYWJiMTk4YTlkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VoIvxrblWagaCI9QYJUDGv7tcYnmapvxbe2ze1Qf2cY'
    }
  };
  
  

  const handleWeel = (e) => {
    e.prevent.default;
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApidata(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener("weel", handleWeel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
