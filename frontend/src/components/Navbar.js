import React, { useEffect, useState } from 'react';
import { FaCross, FaSearch, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { CIcon } from '@coreui/icons-react';
import { cilX } from '@coreui/icons';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState('');
  const navigate = useNavigate();
  const user = window.localStorage.getItem('user');

  const[name,setName]=useState([])

  const Logout = async () => {
    window.localStorage.setItem('user', 'null');
    navigate('/login');
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
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
        .then(data=>setName(data))
        .catch(err=>console.log("internal Error Occured"))
    }
    getReviews();
    

  },[user])


  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const sendMovie = async () => {
    window.localStorage.setItem('moviesearch', searchedMovie);
    await navigate('/search');
    setShowSearch(!showSearch);
    window.location.reload();
  };

  return (
    <div>
      {user !== 'null' ? (
        <div className='flex items-center justify-between p-4 w-full z-[100] absolute '>
          <Link to='/'>
            <h1 className='text-red-600 text-2xl sm:text-4xl md:text-5xl cursor-pointer font-bold '>LetterBox</h1>
          </Link>
          <div className='flex items-center '>
            {
              !showSearch ?
                <FaSearch className='text-white font-bold text-xl md:text-2xl mx-2 md:mx-5 hover:cursor-pointer' onClick={toggleSearch} />
                :
                <FaTimes className='text-white font-bold text-xl md:text-2xl mx-2 md:mx-5 hover:cursor-pointer' onClick={toggleSearch} />
            }
            <div className="relative">
              <button className='text-white mx-4 cursor-pointer' onClick={toggleAccountMenu}>Account</button>
              {showAccountMenu && (

                <div className="absolute bg-gray-800 rounded-lg shadow-md mt-2 py-2 w-48 right-0">
                  <h1 className='text-white text-xl font-bold px-4 pt-2 pb-5'>{name[0].name}</h1>
                  <Link to="/account">
                    <p className="text-gray-300 px-4 py-2 hover:bg-gray-700 cursor-pointer">Profile</p>
                  </Link>
                  <Link to="/watched">
                    <p className="text-gray-300 px-4 py-2 hover:bg-gray-700 cursor-pointer">Watched</p>
                  </Link>
                  <Link to="/friends">
                    <p className="text-gray-300 px-4 py-2 hover:bg-gray-700 cursor-pointer">Friends</p>
                  </Link>
                  <p className="text-gray-300 px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={Logout}>Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between p-4 w-full z-[100] absolute '>
          <Link to='/'>
            <h1 className='text-red-600 text-5xl cursor-pointer font-semibold'>LetterBox</h1>
          </Link>
          <div>
            <Link to='/login'>
              <button className='text-white mx-4 cursor-pointer '>Sign in</button>
            </Link>
            <Link to='/signup'>
              <button className='bg-red-600 text-white px-2 py-1 rounded cursor-pointer '>Sign up</button>
            </Link>
          </div>
        </div>
      )}
      {showSearch && (
        <div>
          <div className='fixed top-0 left-0 w-full h-full bg-black/70 z-30'></div>
          <input
            className='bg-gray-900 border border-gray-300 text-white w-[70%] ml-[15%] h-15  mt-[20%] md:mt-[8%] absolute z-50 p-4 rounded'
            placeholder='Search'
            onChange={(e) => setSearchedMovie(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMovie(); // Call your sendmovie function here
              }
            }}
          />
        </div>
      )}

    </div>
  );
}

export default Navbar;
