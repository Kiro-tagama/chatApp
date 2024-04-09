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

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // Some browsers choke on 204
}))
app.use(bodyParser.json());

app.get('/',(req,res)=>{res.status(200).send("Server ON")})

const connectDB=()=>db.connect().then(_=>log("db conected")).catch(err=>{log("db off : "+ err);setTimeout(connectDB, 3000)})
connectDB()

app.use('/auth',authRoutes)
app.use('/chats',chatRoutes)
app.use('/users',usersRouter)

app.get("/allUsers",async (req,res)=>{
  try {
    const result = await db.query(`SELECT id, name, email FROM users `)

    result.rows.length == 0 ?
      res.status(404).json({ message: "Nem um usuário encontrado" }) :
      res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});