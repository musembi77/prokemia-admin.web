import axios from 'axios';

export default async function Get_Orders(){
    const result = await axios.get("http://localhost:5001/api/get_orders")
    return result
}