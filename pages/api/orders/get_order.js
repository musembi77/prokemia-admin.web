import axios from 'axios';

export default async function Get_Order(payload){
    const result = await axios.post("http://localhost:5001/api/get_order",payload)
    return result
}