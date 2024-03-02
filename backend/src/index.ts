import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { db } from './data/db'
import { log } from 'console'

import authRoutes from './routes/authRoutes'

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());

app.get('/',(req,res)=>{res.status(200).send("Server ON")})
db.connect().then(_=>log("db conected")).catch(_=>log("db off"))

app.use('/auth',authRoutes)
app.use('/chat',authRoutes)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});