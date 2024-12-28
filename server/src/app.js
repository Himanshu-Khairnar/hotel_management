import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

export const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser())

import Hotel from './routes/hotel.route.js'

app.use('/api',Hotel)



