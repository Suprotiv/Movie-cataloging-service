import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

function Account() {
  const[name,setName]=useState('')
  const[name1,setName1]=useState('')
  const[password,setPassword]=useState()
  const navigate=useNavigate()
  const [error,setError]=useState()
  const user=window.localStorage.getItem('user');

  useEffect(()=>{
      
    const data={
      email:user
    }
    const getReviews= async()=>{
      await fetch('http://localhost:8080/nameFetch',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body:JSON.stringify(data)
    
      })
        .then(res=>res.json())
        .then(data=>setName1(data[0].name))
        .catch(err=>console.log("internal Error Occured"))
    }
    getReviews();
    

  },[user])

  const updateName= async()=>{
    const data={
      email:user,
      name:name
    }
    await fetch('http://localhost:8080/updateName',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body:JSON.stringify(data)
  
    })
      .then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log("internal Error Occured"))
      alert('name updated')
  }
  const updatePassword= async()=>{
    const data={
      email:user,
      password:password
    }
    await fetch('http://localhost:8080/updatePassword',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body:JSON.stringify(data)
  
    })
      .then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log("internal Error Occured"))
      alert('name updated')
  }
  const deleteuser=async ()=>{
    const data={
      email:user
    }
    await fetch('http://localhost:8080/deleteUser',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body:JSON.stringify(data)
  
    })
      .then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log("internal Error Occured"))
      alert('user deleted')
      window.localStorage.setItem('user', 'null');
    navigate('/login');
  }
  return (
    <div> <div className='w-full h-[10vh] md:h-[20vh]'>
    <Navbar/>
</div>
<div className="text-white font-bold mx-10 text-3xl">{name1}</div>
<form className="w-1/2 flex flex-col mx-10 mt-10 mb-5 py-4">
    <div className="flex gap-4 items-center">
        <input className="text-white bg-gray-600 py-2 px-4 h-[50px] rounded-md focus:outline-none" placeholder="Enter name" onChange={(e) => setName(e.target.value)}></input>
        <button className="text-white bg-red-600 px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none" onClick={updateName}>Update Name</button>
    </div>
    <div className="flex gap-4 items-center mt-4">
        <input className="text-white bg-gray-600 py-2 px-4 h-[50px] rounded-md focus:outline-none" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
        <button className="text-white bg-red-600 px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none" onClick={updatePassword}>Update Password</button>
    </div>
</form>
<button className="text-white bg-red-600 px-6 py-2 mx-10 rounded-md hover:bg-red-700 focus:outline-none" onClick={deleteuser}>Delete User</button>

    </div>
  )
}

export default Account