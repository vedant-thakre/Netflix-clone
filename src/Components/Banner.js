import React, {useState, useEffect} from 'react'
import axios from '../axios'
import './Banner.css'
import Pop from './Pop';
import requests from '../Requests';

function Banner() {

  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openPop = (movie) => {
    setSelectedMovie(movie);
  };
  
  useEffect(() => {
    async function fetchData(){
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
            request.data.results[
                Math.floor(Math.random() * (request.data.results.length - 1))
            ]
        );
        return request;
    }
    fetchData();
  }, [])

  //console.log(movie)

  function truncate(string, n){
     return string?.length > n ? string.substr(0,n-1) + '...' : string;
  }  

  return (
    <header className='banner'
    style={{
        backgroundSize: 'cover',
        height: '90vh',
        backgroundImage : `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition : "center center", //to maintain the img at center
    }}
    > 
    <div className="banner__content">
        <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.orignal_name}
        </h1>
        <div className="banner_buttons">
            <button className="banner_button"><span className='play_icon'>▶</span>Play</button>
            <button className="banner_button" onClick={() => openPop(movie)}>More Info</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview,150)}</h1>
    </div>
    <div className='banner--fadeBottom'/>
    {selectedMovie && <Pop movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </header>
  )
}

export default Banner
