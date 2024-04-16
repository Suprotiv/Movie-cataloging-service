import { get } from 'mongoose';
import mysql from 'mysql2'

const pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'Suprotiv1!',
    database:'letterbox'
}).promise()

export async function getdata()
{
const [rows]= await pool.query(`select * from employee`);
    return rows;
}

export async function insertUsers(email,password,name)
{
    try{
    const [rows]=await pool.query(`insert into users values(?,?,?)`,[email,password,name])
        return null;
    }
    catch(err)
    {   
        return "User already exists";
    }
    
   
}

export async function insertMovies(movies)
{
    try{
    const [rows]=await pool.query(`insert into movies values(?,?,?,?,?)`,[movies.backdrop_path,movies.id,movies.original_title,movies.overview,movies.release_date])
        return null;
    }
    catch(err)
    {   
        return movies;
    }
    
   
}
export async function insertReview(email,movie,review)
{
    try{
    const [rows]=await pool.query(`insert into reviews values(?,?,?)`,[email,movie,review])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}

export async function insertWatched(email,movie,rating)
{
    try{
    const [rows]=await pool.query(`insert into watched values(?,?,?)`,[email,movie,rating])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}
export async function insertFollows(email,following)
{
    try{
    const [rows]=await pool.query(`insert into follows values(?,?)`,[email,following])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}
export async function deletefollows(email,following)
{
    try{
    const [rows]=await pool.query(`delete from follows where email=? and following=?`,[email,following])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}

export async function insertWatchLater(email,movie)
{
    try{
    const [rows]=await pool.query(`insert into watchLater values(?,?)`,[email,movie])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}

export async function getMovies()
{
    try{
    const [rows]=await pool.query(`SELECT 
    movies.backdrop_path,
    movies.id,
    movies.original_title,
    movies.overview,
    movies.release_date,
    COALESCE(AVG(watched.rating), 0) AS rating 
FROM 
    movies 
LEFT JOIN 
    watched ON movies.id = watched.movie_id  
GROUP BY 
    movies.id 
ORDER BY 
    rating DESC`)
        return rows;
    }
    catch(err)
    {   
        return null;
    }
    
   
}
export async function searchMovies(name)
{
    try{
    const [rows]=await pool.query('select * from movies where original_title like "%"?"%"',[name])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}
export async function getReviews(movie_id)
{
    try{
    const [rows]=await pool.query('select reviews.email,name,review,rating from reviews,users,watched where reviews.email=users.email and watched.email=users.email and watched.movie_id=reviews.movie_id  and reviews.movie_id=?',[movie_id])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}
export async function deleteuser(email)
{
    try{
    const [rows]=await pool.query('delete from users where email=?',[email])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}

export async function getFollowing(email)
{
    try{
    const [rows]=await pool.query('select u.email,u.Name  from follows f,users u where f.following=u.email and  f.email=?',[email])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}
export async function getFollowers(email)
{
    try{
    const [rows]=await pool.query('select u.email,u.Name  from follows f,users u where f.email=u.email and  f.following=?',[email])
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}
export async function getUpcoming()
{
    try{
        const [rows] = await pool.query(`SELECT 
        movies.backdrop_path,
        movies.id,
        movies.original_title,
        movies.overview,
        movies.release_date,
        AVG(watched.rating) AS rating 
    FROM 
        movies 
    LEFT JOIN 
        watched ON movies.id = watched.movie_id 
    GROUP BY 
        movies.id 
    HAVING 
        STR_TO_DATE(movies.release_date, '%Y-%m-%d') > CURDATE() 
    ORDER BY 
        movies.release_date DESC`);
        return rows;
    }
    catch(err)
    {   
        return null;
    }
    
   
}
export async function getWatched(email)
{
    try{
        const [rows] = await pool.query(`CALL get_movie_watched_for_user(?);`,[email]);
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}
export async function getcheckfollows(email,following)
{
    try{
        const [rows] = await pool.query('select following from follows where email=? and following=?',[email,following]);
        if(rows.length===0)
            return false;
        return true;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}

export async function getWatchLater(email)
{
    try{
        const [rows] = await pool.query(`CALL get_movie_watchlater_for_user(?);`,[email]);
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}
export async function getusers(email,key)
{
    try{
        const [rows] = await pool.query('select * from users where email !=? and name like "%"?"%"',[email,key]);
        return rows;
    }
    catch(err)
    {   
        return err.message;
    }
    
   
}

export  async function loginUsers(email,password)
{
        const[rows]= await pool.query(`select email from users where email=? and password=?`,[email,password]);
        if(rows.length===0)
        {
            return 'username or password doesnt exits';
        }
        else
        {
            return null;
        }
}
export  async function updateName(email,name)
{
        const[rows]= await pool.query(`CALL update_user_name_or_password(?, ?,'', TRUE, FALSE);`,[email,name]);
        return rows;
}
export  async function updatePassword(email,password)
{
        const[rows]= await pool.query(`CALL update_user_name_or_password(?,'',?, FALSE, TRUE);`,[email,password]);
        return rows;
}
export  async function getName(email)
{
        const[rows]= await pool.query(`select name from users where email=?`,[email]);
        return rows;
}





