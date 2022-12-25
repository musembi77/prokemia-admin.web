import axios from 'axios';

export default async function Suspend_Salesperson(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/suspend_salesperson_account",payload)
    return result
}