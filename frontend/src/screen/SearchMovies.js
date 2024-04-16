import axios from 'axios';
import React, { useEffect, useState } from 'react'
import request from '../Request';
import Rowmovieadd from '../components/Rowmovieadd';
import Navbar from '../components/Navbar';
import { get } from 'mongoose';
import { Link } from 'react-router-dom';
import Rowsearchadd from '../components/Rowsearchadd';

function SearchMovies() {

const[movies,setmovies]=useState([])
const[name,setName]=useState()

const searchedmovie = window.localStorage.getItem('moviesearch');

useEffect(()=>{
    console.log("name ",searchedmovie)
    const data={
        name:searchedmovie
    }
    const getmovies=(async (e)=>{
        
        await fetch('http://localhost:8080/searchedmovieFetch',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body:JSON.stringify(data)
        
          })
            .then(res=>res.json())
            .then(data=>setmovies(data))
            .catch(err=>console.log("internal Error Occured"))
    
      

})
getmovies()
},[])



console.log(searchedmovie)
  return (
    <>
    <div className='w-full h-[10vh] md:h-[20vh]'>
        <Navbar/>
    </div>
  <div>
    {movies.length !== 0 ?
      movies.map((item, index) => (
        item?.backdrop_path ?
          <Rowsearchadd item={item} /> : null
      )) :
      <p className='text-gray-600 text-3xl flex justify-center items-center h-[20vh] w-full'>Nothing to show!</p>}
  </div>
  <div className='flex justify-center items-center mt-[10vh] flex-col'>
    
    <h1 className='text-gray-300 font-bold text-xl p-3'>Not what you are looking for?</h1>
    <Link to='/add' className='text-white p-3 hover:underline'>Click here to add it </Link>
    
  </div>
</>

  )
}

export default SearchMovies