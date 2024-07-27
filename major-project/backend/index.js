const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');

const cors = require("cors");
app.use(cors());

const router = require('./routes/dishesRoutes');
const userRoute = require('./routes/userRoutes');

app.use(express.json());

mongoose.connect('mongodb+srv://mansichopra55:c7EhI8ZAsC1MjxfR@cluster0.hihpuwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));


app.use((req,res,next)=>{
  console.log("time", Date.now());
  next();
})
// app.get('/api/dishes', getDishes)

app.use('/api',router);

app.use('/api',userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})