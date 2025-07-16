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

app.use(cors())

//to  link router use router level middleware
app.use("/user",UserRouter)
app.use("/food",FoodRouter)

app.listen(3001)
console.log("server invoked at 3001 port")
