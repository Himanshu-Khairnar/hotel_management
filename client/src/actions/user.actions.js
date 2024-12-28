import axios from "axios"


const baseURL = 'http://localhost:3000/api'

export const login = async (userName, password, role) => {
    console.log(userName, password)
    try {
        const response = await axios({
            method: 'post',
            url: `${baseURL}/login`,
            data: {
                username: userName,
                password: password,
                role: role
            }
        })


        return response.data.user
    } catch (error) {
        console.log(error)
    }
}

export const registerHotels = async (formdata) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${baseURL}/hotels`,
            headers: {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data'
            },
            data: formdata
        })
        console.log()
        return response.data.hotel
    } catch (error) {
        console.log(error)
    }
}

export const gethotels = async () => {
    try {
        const response = await axios({ method: 'get', url: `${baseURL}/hotels`, })
        console.log(response.data)
        return response.data
    } catch (error) {

    }
}

export const specificHotelsbyIds = async (id) => {
    try {
        const response = await axios({ method: 'get', url: `${baseURL}/hotels/${id}` })

        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const getGuests = async () => {
    try {
        const response = await axios({
            method: 'get', url: `${baseURL}/guests`
        })
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const postGuests = async (formdata) => {
    try {
        console.log(formdata)
        const response = await axios({
            method: 'post',
            url: `${baseURL}/guests`,
            data:formdata
        })
        return response.data


    } catch (error) {
        console.log(error)
    }
}

export const getSingleGuest = async (id)=>{
    try {
        const response= await axios({method:"get",url:`${baseURL}/guests/${id}`})
        return response.data
    } catch (error) {
        console.log(error)
    }
}