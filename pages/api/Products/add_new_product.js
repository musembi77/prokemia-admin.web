import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Add_New_Product(payload) {
    const result = await axios.post("http://localhost:5001/api/add_product",payload)
    return result
}