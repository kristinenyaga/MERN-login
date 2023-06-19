import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connect from './db/conn.js'
import router from './router/route.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: "10mb" }));
// morgan-used to log http requests inside the console

app.use(morgan('tiny'));
app.disable('x-powered-by') //hackers wont know your stack

const port = 8080

app.get('/', (req, res) => {
  res.status(200).json("heloo from home")
})

// api routes
//all routes will start with /api
app.use('/api',router)
// start server when we establish a connection with db
connect().then(() => {
  try {
    app.listen(port, () => {
      console.log("listening on port 8080");
    });
    
  }
  catch (error) {
    console.log(`error cannot connect`)
  }
}).catch(error => {
  console.log("invalid connection")
})

