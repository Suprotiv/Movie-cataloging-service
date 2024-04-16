import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Users from '../components/Users'

function Friends() {
    const[option,setOption]=useState('pending')
    const user=window.localStorage.getItem('user')
    const[users,setUsers]=useState([])
    const[searchuser,setSearchuser]=useState("")

   
    useEffect(()=>{
        if(option==='pending'){
          console.log(user)
        const data={
            email:user,
            key:searchuser
        }
        const getmovies= async()=>{
            await fetch('http://localhost:8080/usersFetch',{
                method:'POST',
                headers: {
                  'Content-Type': 'application/json'
              },
                body:JSON.stringify(data)
            
              })
                .then(res=>res.json())
                .then(data=>setUsers(data))
                .catch(err=>console.log("internal Error Occured"))
          }
          getmovies();
        }
        else if (option==='confirmed')
        {
            const data={
                email:user
            }
            const getmovies= async()=>{
                await fetch('http://localhost:8080/followingFetch',{
                    method:'POST',
                    headers: {
                      'Content-Type': 'application/json'
                  },
                    body:JSON.stringify(data)
                
                  })
                    .then(res=>res.json())
                    .then(data=>setUsers(data))
                    .catch(err=>console.log("internal Error Occured"))
              }
              getmovies();
        }
        else if(option==='rejected')
        {
            const data={
                email:user
            }
            const getmovies= async()=>{
                await fetch('http://localhost:8080/followersFetch',{
                    method:'POST',
                    headers: {
                      'Content-Type': 'application/json'
                  },
                    body:JSON.stringify(data)
                
                  })
                    .then(res=>res.json())
                    .then(data=>setUsers(data))
                    .catch(err=>console.log("internal Error Occured"))
              }
              getmovies();
        }
      },[searchuser,user,option])

     console.log(users)
      
    
    return (
        <div>
            <div className='flex'>
            <Navbar/>
            </div>

           <div className='flex justify-center items-center gap-6 mt-[8%]'>
           <p className={` font-bold text-lg md:text-3xl hover:cursor-pointer ${option === 'pending' ? 'text-white' :'text-gray-400'}`} onClick={() => setOption('pending')}>Search</p>
        <p className={`font-bold text-lg md:text-3xl hover:cursor-pointer ${option === 'confirmed' ? 'text-white' : 'text-gray-400'}`} onClick={() => setOption('confirmed')}>Following</p>
        <p className={`font-bold text-lg md:text-3xl hover:cursor-pointer ${option === 'rejected' ? 'text-white' : 'text-gray-400'}`} onClick={() => setOption('rejected')}>Followers</p>
        </div>
        {
            option==='pending' ?
            <>
            <input
            className='bg-gray-900 border border-gray-300 text-white w-[50%] ml-[25%] h-15  mt-[20%] md:mt-[3%] absolute z-0 p-4 rounded'
            placeholder='Find your friends' value={searchuser}
            onChange={(e) => setSearchuser(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
               
              }
            }}
          />
          
        </>
          :
          null
        }
        <div className='mt-[15%]'>
          {
            (users.length!==0)?
           users.map((item)=>(
            <Users items={item}/>
           ))
           :
           <p className='text-5xl font-bold text-gray-300 flex justify-center items-center h-[60vh]'>Nothing to Show !</p>
           }
        </div>
    
            
    
        </div>
      )
}

export default Friends