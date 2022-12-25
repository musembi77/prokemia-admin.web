import axios from 'axios';

export default async function Get_SalesPerson(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/get_salesperson_account",payload)
    return result
}