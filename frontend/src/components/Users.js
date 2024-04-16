import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Users({items}) {
    const user=window.localStorage.getItem('user')
    const [followcheck,setFollowcheck]=useState(false);
    const[dataa,setData]=useState();
    const navigate=useNavigate();

    useEffect(()=>{
      const data={
        email:user,
        following:items?.email
    }
    const getfollowscheck= async()=>{
        await fetch('http://localhost:8080/followscheckFetch',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body:JSON.stringify(data)
        
          })
            .then(res=>res.json())
            .then(data=>setFollowcheck(data))
            .catch(err=>console.log("internal Error Occured"))
      }
      getfollowscheck();
    },[user,items,dataa])
    const Following= async()=>{
        const data={
            email:user,
            following:items?.email
        }
        await fetch('http://localhost:8080/followsInsert',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body:JSON.stringify(data)
        
          })
            .then(res=>res.json())
            .then(data=>setData(data))
            .catch(err=>console.log("internal Error Occured"))
        
        alert("followed")

      }
      const removeFollowing= async()=>{
        const data={
            email:user,
            following:items?.email
        }
        await fetch('http://localhost:8080/followsdelete',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body:JSON.stringify(data)
        
          })
            .then(res=>res.json())
            .then(data=>setData(data))
            .catch(err=>console.log("internal Error Occured"))
        
        alert("removed")

      }
      const getusergetails=()=>{
        window.localStorage.setItem('friends', JSON.stringify(items));
        navigate(`/friendsDetails`)
      }
  return (
    <>
    <div className='bg-gray-800 w-[90%] flex items-center cursor-pointer relative p-3 md:p-6 my-8 mx-[5%] gap-4 md:gap-8 rounded-xl'>
        <div className='flex justify-between w-full'>
         <div className='flex  w-[80%]' onClick={getusergetails}>
            <img src='' className=' h-[90px] md:h-[100px] w-[90px] md:w-[100px]' alt='/'/>
            <div>
            <h1 className='text-white py-2 text-xl md:text-3xl font-bold'>{items?.Name}</h1>
            <p className='text-white py-2'>email : {items?.email}</p>
            </div>
        </div>
        <div>
          { followcheck ?
            <button className='mt-[35%] border rounded text-white font-bold bg-gray-500 hover:bg-gray-700  border-gray-700 py-1 px-2' onClick={removeFollowing} >Following</button>
            :
            <button className='mt-[35%] border rounded text-white font-bold bg-green-500 hover:bg-green-700 border-green-700 py-1 px-2' onClick={Following}>+Follow</button>
          }
        </div>
        </div>
    </div>
    </>
  )
}

export default Users