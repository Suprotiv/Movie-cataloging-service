import React, { useEffect, useRef, useState } from 'react'
import request from '../Request'
import axios from 'axios'
import Navbar from './Navbar'
import Readmore from './Readmore'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'



function Main() {

const[movies,setmovies]=useState([])

const [check,setCheck]=useState(true)
const navigate=useNavigate()

useEffect(()=>{

  const getmovies= async()=>{
    await fetch('http://localhost:8080/movieFetch')
    .then(res=>res.json())
    .then(data=>setmovies(data))
    .catch(err=>console.log("internal Error Occured"))
  }
  getmovies();
  
},[])

 const movie=movies[Math.floor((Math.random())* movies.length)]
 
const ratinggiven = movie?.rating ? Math.round(movie?.rating * 100) / 100 : 0;

const gomovieselect=()=>{
  window.localStorage.setItem('movie', JSON.stringify(movie));
  navigate(`/${movie?.original_title}`)

}





return (
    <div>
      <div className=' top-0 left-0 w-full h-[80vh] text-white hover:cursor-pointer' onClick={gomovieselect}>
        <div className='w-full h-full'>
            <div className=' absolute w-full h-[80vh]  bg-gradient-to-r from-black'></div>
            <div className='absolute top-[190px] w-[95%] h-[40vh] mx-[2%] my-5'>
                <h1 className='text-white  text-3xl md:text-5xl my-4 font-bold'>{movie?.original_title}</h1>
                <div className='my-8'>
                    <button className=' border text-black font-bold bg-white border-gray-300 py-2 px-2 '>+Log</button>
                    <button className='border text-white border-gray-300  py-2 px-2  mx-5'>Watch later</button>
                </div>
                <p className='text-gray-300 text-sm'>Released on : {movie?.release_date}</p>
                <div className="flex items-center my-4">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < ratinggiven ? 'text-green-500 cursor-pointer text-xl' : 'text-gray-400 text-xl cursor-pointer'}
                      />
                    ))}
                    <p className="ml-2 text-white">{ratinggiven}/5</p>
                </div>
                <Readmore str={movie?.overview}/>
            </div>
          <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
        </div>
      </div>
    </div>
  )
}

export default Main