import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Anime() {
  let { id } = useParams();
  const [charData, setCharData] = useState(null);

  useEffect(() => {
    const fetchChar = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/characters/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched anime data:", data);
        setCharData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log("Fetching anime with ID:", id);
    fetchChar();
  }, [id]);
  return (
    <div>
      <div className="container">
        {charData && (
          <div className="anime-info-list">
            <h1>Title: {charData.data.name}</h1>
            <div className="image-details-container">
              <div className="image-container">
                <a href={`/char/${charData.data.mal_id}`}>
                  <img
                    src={charData.data.images.jpg.image_url}
                    alt={charData.data.name}
                  />
                </a>
              </div>
              <p>Synopsis: {charData.data.about}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Anime;
