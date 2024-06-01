import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null); // Initialize searchData as null
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    setInputValue(inputValue);
  };

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
      setSearchData(null); // Set searchData to null when inputValue is empty
    }
  }, [inputValue]);

  const contextValue = {
    searchData,
    inputValue,
    handleSubmit,
    setInputValue, // Pass setInputValue as part of the context value
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;