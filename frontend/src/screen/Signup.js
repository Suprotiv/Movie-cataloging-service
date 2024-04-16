import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


function Signup() {

  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const[cpassword,setCPassword]=useState()
  const[name,setName]=useState()
  const navigate=useNavigate()
  const[error,setError]=useState()

  const data = {
    email: email,
    password: password,
    name: name
  };

  const submitdata= async (e)=>{
    e.preventDefault();

    await fetch('http://localhost:8080/signup',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
  },
    body:JSON.stringify(data)

  })
    .then(res=>res.json())
    .then(data=>
        {
            setError(data)
            if(!data)
            {
                console.log(error)
                window.localStorage.setItem('user',email);
                navigate('/')
            }
        })
    .catch(err=>setError("internal Error Occured"))

    
   

  
  
}

  
  
   
  return (
    <div> 
     <Navbar/>
      <div className='w-full h-screen'>
        <img
          className='hidden sm:block absolute w-full h-full object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='/'
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold flex justify-center my-3'>Sign Up</h1>
              {
                  error ?<p className='bg-red-900 text-white p-3 rounded'>Error : {error}</p>:null
            }
          <form className='w-full flex flex-col  py-4' onSubmit={submitdata}>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter email'  onChange={(e)=>setEmail(e.target.value)}></input>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter Name' onChange={(e)=>setName(e.target.value)}></input>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter password'  onChange={(e)=>setPassword(e.target.value)} type='password'></input>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Confirm password'  onChange={(e)=>setCPassword(e.target.value)} type='password'></input>
            <button className='bg-red-600 py-4 my-4 rounded' >Sign up</button>
            
            <div className='flex justify-between'>
            <p className='flex items-center'><input type='checkbox' className='mr-2'></input> 
            <p className='text-sm'>Remember me </p>
            </p>
            <p className='text-sm'>Need Help ?</p>
            </div>
            <p className='text-md my-10 mx-8'><span className='text-gray-600 mx-2'>Already have an account ?</span><Link to='/login'>Sign in</Link></p>
          </form>
            
          
        </div>
        </div>
        </div>
       </div>
    
    </div>
  )
}

export default Signup