import React,{useState,useEffect} from 'react'

function Random() {
    const [upcomingData, setUpcoming] = useState(null);

    useEffect(() => {
      const fetchUpcoming = async () => {
        try {
          const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=upcoming', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUpcoming(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchUpcoming();
    }, []); 
  
    return (
      <div className='container'>
        <div className='animes'>
          {upcomingData && upcomingData.data && upcomingData.data.length > 0 ? (
            upcomingData.data.map(anime => (
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

export default Random
