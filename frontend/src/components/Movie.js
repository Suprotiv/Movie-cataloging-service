import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Movie({item}) {

  const navigate=useNavigate()

  const setmovie=()=>{
    window.localStorage.setItem('movie', JSON.stringify(item));
    navigate(`/${item.original_title}`)
  }
  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[300px] inline-block cursor-pointer relative p-2' onClick={setmovie}>
    <img className='rounded-lg' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}/>

<div className='absolute w-full h-full left-0 top-0 bg-black opacity-0 hover:opacity-80'>
    <p className='text-white flex items-center justify-center text-center whitespace-normal h-full'>{item?.original_title}</p>
</div>

</div>
  )
}

export default Movie