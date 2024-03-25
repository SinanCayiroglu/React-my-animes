import React,{useState,useEffect} from 'react'

function Character() {
    const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/characters', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacterData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCharacter();
  }, []); 
  return (
    <div>
      <div className='container'>
      <div className='animes'>
        {characterData && characterData.data && characterData.data.length > 0 ? (
          characterData.data.map(characterData => (
            <a className="anime-card" href={`/char/${characterData.mal_id}`} key={characterData.mal_id}>
              <img src={characterData.images.jpg.image_url} alt="Anime Image" />
              <p>{characterData.name}</p>
            </a>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
    </div>
  )
}

export default Character
