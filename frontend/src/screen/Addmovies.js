import axios from 'axios';
import React, { useState } from 'react'
import request from '../Request';
import Rowmovieadd from '../components/Rowmovieadd';
import Navbar from '../components/Navbar';

function Addmovies() {

const[movies,setmovies]=useState([])
const[name,setName]=useState()

const key='dccc8088d1277ce1b0df49c72c65ea24'

const request = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${name}&page=1&include_adult=false`,
  };

const getmovies=(async (e)=>{
    e.preventDefault()
   await axios.get(request.requestHorror).then((response)=>{
        setmovies(response.data.results)
    })

  
})
console.log(movies)
  return (
    <div>
    <div className='flex justify-center items-center mt-5'>

    <div className="flex items-center">
  <input  onChange={(e) => setName(e.target.value)} 
    type="text" 
    placeholder="Search..." 
    className="border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 flex-1" 
  />
  <button 
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
    onClick={getmovies}
  >
    Search
  </button>
</div>
  </div>
  <div className='mt-10'>
    {movies.length !== 0 ?
      movies.map((item, index) => (
        item?.backdrop_path ?
          <Rowmovieadd key={index} item={item} /> : null
      )) :
      <p className='text-gray-600 text-3xl flex justify-center items-center h-[20vh] w-[90vw]'>Nothing to show!</p>}
  </div>
</div>

  )
}

export default Addmovies