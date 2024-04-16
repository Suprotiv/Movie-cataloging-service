import React from 'react'
import Navbar from '../components/Navbar';
import Movie from '../components/Movie';
import Main from '../components/Main';
import Row from '../components/Row';

function Home() {

    const user=window.localStorage.getItem('user');
  return (
    <div>
        <Navbar/>
        <Main/>
        <Row title='Upcoming' fetchURL='http://localhost:8080/upcomingFetch'/>
        <Row title='Popular' fetchURL='http://localhost:8080/movieFetch'/>
  
        
    </div>
  )
}

export default Home