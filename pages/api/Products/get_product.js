import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_Product(payload){
    const result = await axios.post("http://localhost:5001/api/get_product",payload)
    return result
}