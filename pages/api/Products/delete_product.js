import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Delete_Product(payload){
    const result = await axios.post("http://localhost:5001/api/delete_product",payload)
    return result
}