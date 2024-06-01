import React,{useState,useEffect} from 'react'

function Random() {
    const [randomData, setRandomData] = useState(null);

    useEffect(() => {
      const fetchrandom = async () => {
        try {
          const response = await fetch('https://api.jikan.moe/v4/random/anime', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setRandomData(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchrandom();
    }, []); 
  
    return (
      <div className="container">
        {randomData && (
          <div className="details">
            <div className="title">
              <h1>Title: {randomData.data.title}</h1>
              <p>Synopsis: {randomData.data.synopsis}</p>
            </div>
  
            <div className="detail">
              <div className="image">
                <a href={`/anime/${randomData.data.mal_id}`}>
                  <img src={randomData.data.images.jpg.image_url} alt={randomData.data.title} />
                </a>
              </div>
              <div className="anime-details">
                <p>Type: {randomData.data.type}</p>
                <p>Episodes: {randomData.data.episodes}</p>
                <p>Status: {randomData.data.status}</p>
                <p>Aired: {randomData.data.aired.string}</p>
                <p>Episode duration: {randomData.data.duration}</p>
                <p>Score: {randomData.data.score}</p>
                <p>Rank: {randomData.data.rank}</p>
                <p>Popularity: {randomData.data.popularity}</p>
              </div>
            </div>
            <h3>Trailer:</h3>
            <div className="trailer">
              <iframe src={randomData.data.trailer.embed_url} ></iframe>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default Random;
