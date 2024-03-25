import React, { useEffect, useState } from 'react';

function Search() {
  const [searchData, setSearchData] = useState("");
  
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/anime?q='+searchData, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSearchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSearch();
  }, [searchData]); 

  return (
    <div className='container'>
      <div className='animes'>
        {searchData && searchData.data && searchData.data.length > 0 ? (
          searchData.data.map(anime => (
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

export default Search;