import connectDb from "./Database/connectDb.js";
import events from 'events'
import { app } from "./app.js";
import dotenv from 'dotenv'

dotenv.config({path:'./.env'})
events.defaultMaxListeners = 15

app.get('/',(req,res)=>res.send('hello world'))
connectDb().then(
    app.listen((process.env.PORT),()=>{
 
        console.log("running on ",process.env.PORT," port")
    })
).catch((error)=>{console.log(error)})