import express from 'express';
import cors from 'cors';
import { deletefollows, deleteuser, getFollowers, getFollowing, getMovies, getName, getReviews, getUpcoming, getWatchLater, getWatched, getcheckfollows, getdata, getusers, insertFollows, insertMovies, insertReview, insertUsers, insertWatchLater, insertWatched, loginUsers, searchMovies, updateName, updatePassword } from './database.js';

const app=express()
app.use(cors())
app.use(express.json())

app.get('/signup',async (req,res)=>{
    const row= await getdata()
    res.json(row)
})
app.get('/movieFetch',async (req,res)=>{
  const row= await getMovies()
  res.json(row)
})
app.get('/upcomingFetch',async (req,res)=>{
  const row= await getUpcoming()
  res.json(row)
})
app.post('/usersFetch',async (req,res)=>{
  const {email,key}=req.body
  const row= await getusers(email,key)
  res.json(row)
})
app.post('/deleteUser',async (req,res)=>{
  const {email}=req.body
  const row= await deleteuser(email)
  res.json(row)
})
app.post('/reviewsFetch',async (req,res)=>{
  const {movie_id}=req.body
  const row= await getReviews(movie_id)
  res.json(row)
})
app.post('/searchedmovieFetch',async (req,res)=>{
  const {name}=req.body
  const row= await searchMovies(name)
  res.json(row)
})
app.post('/watchedFetch',async (req,res)=>{
  const {email}=req.body
  const row= await getWatched(email)
  res.json(row)
})
app.post('/watchLaterFetch',async (req,res)=>{
  const {email}=req.body
  const row= await getWatchLater(email)
  res.json(row)
})

app.post('/nameFetch',async (req,res)=>{
  const {email}=req.body
  const row= await getName(email)
  res.json(row)
})

app.post('/followingFetch',async (req,res)=>{
  const {email}=req.body
  const row= await getFollowing(email)
  res.json(row)
})
app.post('/followersFetch',async (req,res)=>{
  const {email}=req.body
  const row= await getFollowers(email)
  res.json(row)
})

app.post('/followscheckFetch',async (req,res)=>{
  const {email,following}=req.body
  const row= await getcheckfollows(email,following)
  res.json(row)
})

app.post('/updateName',async (req,res)=>{
  const {email,name}=req.body
  const row= await updateName(email,name)
  res.json(row)
})
app.post('/updatePassword',async (req,res)=>{
  const {email,password}=req.body
  const row= await updatePassword(email,password)
  res.json(row)
})


app.post('/signup',async (req,res)=>{

  const {email,password,name}=req.body
  const result = await insertUsers(email, password, name);

  res.json(result);
  
})


app.post('/login',async (req,res)=>{

  const {email,password}=req.body
  const result = await loginUsers(email, password);
  res.json(result);
  
})

app.post('/moviesInsert',async (req,res)=>{

  const movies=req.body
  const result = await insertMovies(movies);
  res.json(result);
  
})

app.post('/reviewsInsert',async (req,res)=>{

  const {email,movie,review}=req.body
  const result = await insertReview(email,movie,review);
  res.json(result);
  
})

app.post('/watchedInsert',async (req,res)=>{

  const {email,movie,rating}=req.body
  const result = await insertWatched(email,movie,rating);
  res.json(result);
  
})
app.post('/followsInsert',async (req,res)=>{

  const {email,following}=req.body
  const result = await insertFollows(email,following);
  res.json(result);
  
})

app.post('/followsdelete',async (req,res)=>{

  const {email,following}=req.body
  const result = await deletefollows(email,following);
  res.json(result);
  
})
app.post('/watchLaterInsert',async (req,res)=>{

  const {email,movie}=req.body
  const result = await insertWatchLater(email,movie);
  res.json(result);
  
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(8080,()=>{
    console.log("Server is running")
  })