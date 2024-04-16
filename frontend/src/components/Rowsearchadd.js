import React from 'react'
import { useNavigate } from 'react-router-dom'

function Rowsearchadd({item}) {

    const navigate=useNavigate()

    const addmovie= async ()=>{

        window.localStorage.setItem('movie', JSON.stringify(item));
    navigate(`/${item.original_title}`)

    }
  return (
    <div className='w-[190px] sm:w-[210px] md:w-[240px] lg:w-[340px] inline-block cursor-pointer relative p-2 rounded' onClick={addmovie}>
        <img className='rounded-lg' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}/>
    
    <div className='absolute w-full h-full left-0 top-0 bg-black opacity-0 hover:opacity-80'>
        <p className='text-white flex items-center justify-center text-center whitespace-normal mt-[10vh]'>{item?.original_title}</p>
    </div>
    </div> 
  )
}

export default Rowsearchadd