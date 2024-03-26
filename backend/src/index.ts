import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { db } from './data/db'
import { log } from 'console'

import authRoutes from './routes/authRoutes'
import chatRoutes from './routes/chatRoutes'
import usersRouter from './routes/usersRouter'

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());

app.get('/',(req,res)=>{res.status(200).send("Server ON")})

const connectDB=()=>db.connect().then(_=>log("db conected")).catch(err=>{log("db off : "+ err);setTimeout(connectDB, 3000)})
connectDB()

app.use('/auth',authRoutes)
app.use('/chats',chatRoutes)
app.use('/users',usersRouter)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});