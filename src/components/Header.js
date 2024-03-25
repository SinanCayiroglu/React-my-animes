import React,{useState,useEffect} from 'react'

function Header() {
    const [searchData, setSearchData] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue) {
      const fetchSearch = async () => {
        try {
          const response = await fetch(
            "https://api.jikan.moe/v4/anime?q=" + inputValue,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setSearchData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchSearch();
    } else {
      setSearchData("");
    }
  }, [inputValue]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(e.target.elements.search.value);
  };
  
  return (
    <>
      <div className='header'>
        <form action='/search' onSubmit={handleSubmit}>
            <input type='text' name="search"  placeholder='search an anime'></input>
        </form>
        <form action='/random' method='get'>
            <input type='submit'  value="random anime"></input>
        </form>
        <form action='/upcoming'  method='get'>
            <input type='submit' value="upcoming animes" ></input>
        </form>
        <form action='/' method='get'>
            <input type='submit' value="popular animes"></input>
        </form>
        <form action='/character' method='get'>
            <input type='submit' value="popular characters"></input>
        </form>
        
      </div>
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
      
   </>
  )
}

export default Header
