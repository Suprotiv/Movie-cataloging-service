import React, { useEffect, useState } from 'react'
import Readmore from '../components/Readmore';

import ReviewRow from '../components/ReviewRow';
import Navbar from '../components/Navbar';
import { FaRegStar, FaStar, FaTimes } from 'react-icons/fa';

function MoviedSelect() {

  const [rating, setRating] = useState(0);
    const[review,setReview]=useState()
    const[review1,setReview1]=useState([])
    const[reviewcheck,setReviewCheck]=useState([])
    const[add,setAdd]=useState(false)
    const user=window.localStorage.getItem('user')
    const movie = JSON.parse(window.localStorage.getItem('movie'));

    const ratinggiven = movie.rating ? Math.round(movie.rating * 100) / 100 : 0;


    const handleStarClick = (index) => {
      setRating(index + 1);
    };

    useEffect(()=>{
      
      const data={
        movie_id:movie.id
      }
      const getReviews= async()=>{
        await fetch('http://localhost:8080/reviewsFetch',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body:JSON.stringify(data)
      
        })
          .then(res=>res.json())
          .then(data=>{
            setReview1(data) 
            setReviewCheck(review1.filter((e)=>e.email==user))
          })
          .catch(err=>console.log("internal Error Occured"))
      }
      getReviews();
      

    },[movie,user])


    const addreview= async ()=>{
        const data={
            email:user,
            movie:movie.id,
            review:review
          }
          
      
          await fetch('http://localhost:8080/reviewsInsert',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body:JSON.stringify(data)
        
          })
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.log("internal Error Occured"))

            alert(`added to database !`)
    }
    
    const addwatched=async()=>{
      const data={
        email:user,
        movie:movie.id,
        rating:parseInt(rating)
      }

      console.log(data)

      if(user==null)
      {
        alert('signup in order to log movies')
        return ;
      }
  
      await fetch('http://localhost:8080/watchedInsert',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body:JSON.stringify(data)
    
      })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log("internal Error Occured"))
      addreview()
    

    }
    const addwatchlater= async (e)=>{
      const data={
        email:user,
        movie:movie.id,
      }


  
      await fetch('http://localhost:8080/watchLaterInsert',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body:JSON.stringify(data)
    
      })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log("internal Error Occured"))

        alert('added to watchlater')
    }
    console.log(movie.rating)
  return (
    <div >
          {
          add ?
          <>
            <div className='fixed bg-black/70 h-full w-full z-50'>
             <div className='flex justify-center align-items w-full h-full'>
                <div className='rounded  bg-gray-600 w-[80vh] h-[50vh] mt-[25vh]'>
                  <div className='flex justify-between'>
                  <div>
                    <p className='text-gray-300  m-3 px-2 text-lg'>Add to your list</p>
                    <h1 className='text-white font-bold mt-7 px-3 text-2xl'>{movie?.original_title}</h1>
                    <textarea onChange={(e) => setReview(e.target.value)} className='border p-4 my-8 ml-4 text-black bg-gray-200 border-gray-300 h-[150px] w-[73vh] rounded' placeholder='Write a review' />
                  </div>
                  <div>
                  <FaTimes className='text-white text-2xl mr-3 mt-3 hover:cursor-pointer' onClick={()=>setAdd(false)}></FaTimes>
                  </div>
                </div>
                <div className='flex justify-between mt-5'>
                <div className='flex gap-3'>
                <div className="flex items-center m-4">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        onClick={() => handleStarClick(index)}
                        className={index < rating ? 'text-green-500 cursor-pointer text-xl' : 'text-gray-400 text-xl cursor-pointer'}
                      />
                    ))}
                    <p className="ml-2 text-white">{rating}/5</p>
                </div>
                </div>
                <div>
                <button className='mx-4 border rounded text-white font-bold bg-green-500 border-gray-500 py-2 px-2' onClick={addwatched}>Submit</button>
                </div>
                </div>
                </div>
             </div>
            </div>
          </>
          :
          <Navbar/>
        }

    <div className=' top-0 left-0 w-full h-[80vh] text-white'>
        <div className='w-full h-full'>
            <div className=' absolute w-full h-[80vh]  bg-gradient-to-t from-gray-950'></div>
            <div className='absolute top-[190px] w-[95%] h-[40vh] mx-[2%] my-5'>
                <h1 className='text-white  text-3xl md:text-5xl my-4 font-bold'>{movie?.original_title}</h1>
                {reviewcheck.length===0 ?
                <div className='my-8'>
                    <button className=' border text-black font-bold bg-white border-gray-300 py-2 px-2 ' onClick={()=>{user!==null ? setAdd(true) : alert('login in order to log movies')}}>+ Log</button>
                    <button className='border text-white border-gray-300  py-2 px-2  mx-5' onClick={addwatchlater}>Watch later</button>
                </div>
                :
                <div className='my-8'>
                <button className=' border text-black font-bold bg-white border-gray-300 py-2 px-2 '>✓ Logged</button>
                <button className='border text-white border-gray-300  py-2 px-2  mx-5' onClick={addwatchlater}>Watch later</button>
                </div>
                }
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
      <div>
        <h1 className='text-white font-bold text-3xl p-4  mt-5'>Reviews</h1>
        { reviewcheck.length!==0 ?
        <div className='flex flex-col w-[78%] ml-[8%]'>
          <textarea onChange={(e) => setReview(e.target.value)} className='border p-8 my-8 text-white bg-black border-gray-300 resize-y h-[150px]' placeholder='Write a review' />
          <button className='mx-4 border text-black font-bold bg-white border-gray-500 py-2 px-2' onClick={addreview}>Submit</button>
        </div>
        :
        <div className='flex justify-center items-center h-[100px] w-[95%]'>
          <h1 className='text-gray-300 text-xl'>Add to watch list in order to review</h1>
          </div>
        }
        {review1 ?
          review1.length!==0 ?
          review1.map((item) => (
            <ReviewRow items={item} />
          ))
          :
          <div className='flex justify-center items-center h-[250px] w-[95%]'>
          <h1 className='text-gray-300 text-xl'>Be the first one to review !</h1>
          </div>
          :
          null
        }
        
      </div>
    
  </div>
  
  
  )
}

export default MoviedSelect