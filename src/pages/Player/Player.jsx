import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  
  const [apiDataPlay, setApiDataPlay]= useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })


  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmE0NDNmNDZhOGYzNWI4MDIyNWY0ODMxZWVmY2EwOCIsIm5iZiI6MTcyMDY5MzMzMC4xMzc2OSwic3ViIjoiNjY4ZDRhMGI4MmI2MmVjYWJiMTk4YTlkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VoIvxrblWagaCI9QYJUDGv7tcYnmapvxbe2ze1Qf2cY'
    }
  };

  useEffect(()=>{
    
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => response.results[0])
    .then(response => 
      
      setApiDataPlay(response)
    )
    .catch(err => console.error(err));
    
  },[])
  
 

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="back" onClick={()=>{navigate("/")}} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiDataPlay.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiDataPlay.published_at.slice(0,10)}</p>
        <p>{apiDataPlay.name}</p>
        <p>{apiDataPlay.type}</p>
      </div>
    </div>
  );
};

export default Player;
