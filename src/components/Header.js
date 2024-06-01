import React,{useState,useEffect,useContext} from 'react'
import ContextProvider, { GlobalContext } from './Context';
function Header() {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const inputValue = e.target.elements.search.value;
  //   setInputValue(inputValue);
  // }; 
  const { inputValue, handleSubmit, setInputValue } = useContext(GlobalContext);
  
   return (
    <>
      <div className='header'>
        <form action='/search' method='get' onSubmit={handleSubmit}>
            <input type='text'  name="search"  placeholder='search an anime'></input>
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
      
      
   </>
  )
}

export default Header
