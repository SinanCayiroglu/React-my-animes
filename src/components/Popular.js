import React, { useEffect, useState } from 'react';

function Popular() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className='container'>
      <div className='animes'>
        {responseData && responseData.data && responseData.data.length > 0 ? (
          responseData.data.map(anime => (
            <a className="anime-card" href={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <img src={anime.images.jpg.image_url} alt="Anime Image" />
              <p>{anime.title}</p>
            </a>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default Popular;