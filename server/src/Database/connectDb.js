import mongoose from 'mongoose'
import { DB_NAME } from './constant.js'



const connectDb=async()=> 
{
    const uri  = process.env.MONGODB_URI
    try {
        const connectInstance = await mongoose.connect(`${uri}/${DB_NAME}`)
        console.log('connected to db successfully',connectInstance.connection.host)
    } catch (error) {
        console.log("Something went wrong",error)
    }
}


export default connectDb