import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"

function Anime() {
    let { id } = useParams();
    const [animeData, setAnimeData] = useState(null);
    const [charData, setCharData] = useState(null);

    useEffect(() => {
      const fetchAnime = async () => {
        try {
          const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Fetched anime data:', data)
          setAnimeData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      console.log('Fetching anime with ID:', id)
      fetchAnime();
    }, [id]); 
    useEffect(() => {
        const fetchChar = async () => {
          try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched anime data:', data)
            setCharData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        console.log('Fetching anime with ID:', id)
        fetchChar();
      }, [id]); 
  return (
    <div>
       <div className="container">
        {animeData && (
          <div className="details">
            <div className="title">
              <h1>Title: {animeData.data.title}</h1>
              <p>Synopsis: {animeData.data.synopsis}</p>
            </div>
  
            <div className="detail">
              <div className="image">
                <a href={`/anime/${animeData.data.mal_id}`}>
                  <img src={animeData.data.images.jpg.image_url} alt={animeData.data.title} />
                </a>
              </div>
              <div className="anime-details">
                <p>Type: {animeData.data.type}</p>
                <p>Episodes: {animeData.data.episodes}</p>
                <p>Status: {animeData.data.status}</p>
                <p>Aired: {animeData.data.aired.string}</p>
                <p>Episode duration: {animeData.data.duration}</p>
                <p>Score: {animeData.data.score}</p>
                <p>Rank: {animeData.data.rank}</p>
                <p>Popularity: {animeData.data.popularity}</p>
              </div>
            </div>
            <h3>Trailer:</h3>
            <div className="trailer">
              <iframe src={animeData.data.trailer.embed_url} allowfullscreen="true" height="300" width="600" ></iframe>
            </div>
            <div className="characters">
                            {charData && charData.data && charData.data.length > 0 &&
                                charData.data.map(character => (
                                    <div className="character" key={character.character.mal_id}>
                                        <a href={`/char/${character.character.mal_id}`}>
                                            <img src={character.character.images.jpg.image_url} alt={character.character.name} />
                                            <p>{character.character.name}</p>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Anime
