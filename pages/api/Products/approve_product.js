import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Approve_Product(payload) {
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/approve_product",payload)
    return result
}