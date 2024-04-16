import axios from 'axios';
import React, { useEffect, useState } from 'react'
import request from '../Request';
import Rowmovieadd from '../components/Rowmovieadd';
import Navbar from '../components/Navbar';
import { get } from 'mongoose';
import { Link } from 'react-router-dom';
import Rowsearchadd from '../components/Rowsearchadd';
import { cilObjectGroup } from '@coreui/icons';

function WatchedMovies() {
    const[movies,setmovies]=useState([])
    const[movieslater,setmovieslater]=useState([])
    const[name,setName]=useState()
    
    const user = window.localStorage.getItem('user');
    useEffect(()=>{
        const data={
            email:user
        }
        const getmovies=(async (e)=>{
            
            await fetch('http://localhost:8080/watchedFetch',{
                method:'POST',
                headers: {
                  'Content-Type': 'application/json'
              },
                body:JSON.stringify(data)
            
              })
                .then(res=>res.json())
                .then(data=>setmovies(data[0]))
                .catch(err=>console.log("internal Error Occured"))
        
          
    
    })
    const getmovieslater=(async (e)=>{
            
        await fetch('http://localhost:8080/watchLaterFetch',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body:JSON.stringify(data)
        
          })
            .then(res=>res.json())
            .then(data=>setmovieslater(data[0]))
            .catch(err=>console.log("internal Error Occured"))
    
      

})
    
    getmovies()
    getmovieslater()
    },[])
    console.log(movies)
  return (
    <>
    <div className='w-full h-[10vh] md:h-[20vh]'>
        <Navbar/>
    </div>
    <div className='text-white font-bold text-xl md:text-4xl mb-[5%] mx-6'>Watched Movies </div>
  <div className='mx-6'>
    {movies.length !== 0 ?
      movies.map((item, index) => (
        item?.backdrop_path ?
          <Rowsearchadd item={item} /> : null
      )) :
      <p className='text-gray-600 text-3xl flex justify-center items-center h-[20vh] w-full'>Nothing to show!</p>}
  </div>
  <div className='text-white font-bold text-xl md:text-4xl mb-[5%] mx-6 mt-[10%]'>Watch Later </div>
  <div className='mx-6'>
    {movieslater.length !== 0 ?
      movieslater.map((item, index) => (
        item?.backdrop_path ?
          <Rowsearchadd item={item} /> : null
      )) :
      <p className='text-gray-600 text-3xl flex justify-center items-center h-[20vh] w-full'>Nothing to show!</p>}
  </div>
  
  
  
</>

  )
}

export default WatchedMovies