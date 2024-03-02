import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => { res.status(200).send("Server ON"); });
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`);
});
