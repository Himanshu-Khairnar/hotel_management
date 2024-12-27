import axios from "axios"


const baseURL = 'http://localhost:3000/api'

export const login = async(userName,password)=>{
    console.log(userName,password)
    try {
        const response = await axios({
            method: 'post',
            url: `${baseURL}/login`,
            data: {
                username: userName,
                password: password
            }
        })

        
        return response.data.user
    } catch (error) {
        console.log(error)
    }
}

export const registerHotels = async (formdata)=>{
    try {   
        const response = await axios({
            method:'post',
            url:`${baseURL}/hotels`,
            headers: {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data'
            },
            data:formdata
        })
        console.log()
        return response.data.hotel
    } catch (error) {
        console.log(error)
    }
}

export const gethotels = async()=>{
    try {
        const response = await axios({ method: 'get',url:`${baseURL}/hotels`,})
        console.log(response.data)
        return response.data
    } catch (error) {
        
    }
}