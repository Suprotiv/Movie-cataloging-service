import React, { useEffect, useState } from 'react'
import Rowsearchadd from '../components/Rowsearchadd';
import Navbar from '../components/Navbar';

function FriendsDetails() {
    const item = JSON.parse(window.localStorage.getItem('friends'));
    console.log(item)
    const[movies,setmovies]=useState([])
    const[movieslater,setmovieslater]=useState([])

    useEffect(()=>{
        const data={
            email:item?.email
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
    },[item])
  return (
    <div>
         <div className='w-full h-[10vh] md:h-[20vh]'>
        <Navbar/>
    </div>
        <div className='flex  mx-6  mb-[3%] gap-5'>
         <img src='' className=' h-[90px] md:h-[100px] w-[90px] md:w-[100px]' alt='/'/>
         <div>
        <h1 className='text-white font-bold text-3xl'>{item?.Name}</h1>
        <p className='text-gray-300 text-xl'>{item?.email}</p>
        </div>
        </div>
        <div className='flex bg-gray-400 w-[95%] h-[2px] ml-6'></div>
        <div className='text-gray-200 font-bold text-xl md:text-3xl mb-[5%] mt-[5%] mx-6'>Watched Movies </div>
  <div className='mx-6'>
    {movies.length !== 0 ?
      movies.map((item, index) => (
        item?.backdrop_path ?
          <Rowsearchadd item={item} /> : null
      )) :
      <p className='text-gray-600 text-3xl flex justify-center items-center h-[20vh] w-full'>Nothing to show!</p>}
  </div>
  <div className='text-gray-200 font-bold  text-xl md:text-3xl mb-[5%] mx-6 mt-[10%]'>Watch Later </div>
  <div className='mx-6'>
    {movies.length !== 0 ?
      movieslater.map((item, index) => (
        item?.backdrop_path ?
          <Rowsearchadd item={item} /> : null
      )) :
      <p className='text-gray-600 text-3xl flex justify-center items-center h-[20vh] w-full'>Nothing to show!</p>}
  </div>
    </div>
  )
}

export default FriendsDetails