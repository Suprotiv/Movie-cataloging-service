
import React, { useEffect, useState } from 'react'
import Movie from './Movie'


function Row({title,fetchURL}) {

    const[movies,setMovies]=useState([])
   

    useEffect(()=>{
        const getmovies= async()=>{
            await fetch(fetchURL)
            .then(res=>res.json())
            .then(data=>setMovies(data))
            .catch(err=>console.log("internal Error Occured"))
          }
          getmovies();
          
    },[])
  return (
   <div>
    <h1 className='text-white text-lg md:text-2xl font-bold  my-1 md:my-8 mx-2'>{title}</h1>
    <div className='relative flex items-center'>
        <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
        {movies.map((item,index)=>(
            <Movie item={item}/>
            
        ))}
        </div>
    </div>
    </div>
  )
}

export default Row