import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'

const app=express()

//to link router
import UserRouter from './routes/user.router.js'
import FoodRouter  from './routes/donor.router.js'

//configuration to fetch req.body content :  body-parser middleware
//used to fetch req data from methods like:POST, PATCH, DELETE, PUT 
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//configuration to solve cross-origin problem
app.use(cors({
  origin: 'https://meal-bridge-vert.vercel.app',
  credentials: true, // 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["content-type", "Authorization"]
}));


//to  link router use router level middleware
app.use("/user",UserRouter)
app.use("/food",FoodRouter)


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server invoked at port ${PORT}`);
});
