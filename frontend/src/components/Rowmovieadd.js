import React from 'react'

function Rowmovieadd({item}) {

    const addmovie= async ()=>{

        const data={
            backdrop_path:item.backdrop_path,
            id:item.id,
            original_title:item.title,
            overview:item.overview,
            release_date:item.release_date
          }
      
          await fetch('http://localhost:8080/moviesInsert',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body:JSON.stringify(data)
        
          })
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.log("internal Error Occured"))

            alert(`${item.title} added to database !`)

    }
  return (
    <div className='w-[180px] sm:w-[200px] md:w-[240px] lg:w-[350px] inline-block cursor-pointer relative p-2'>
        <img className='rounded-lg' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}/>
    
    <div className='absolute w-full h-full left-0 top-0 bg-black opacity-0 hover:opacity-80'>
        <p className='text-white flex items-center justify-center text-center whitespace-normal mt-[10vh]'>{item?.title}</p>

        <div className='text-white mt-5 py-3  bg-green-500 flex  items-center justify-center text-center  whitespace-normal ' onClick={addmovie}>Add movie</div>
    </div>
    </div> 
  )
}

export default Rowmovieadd