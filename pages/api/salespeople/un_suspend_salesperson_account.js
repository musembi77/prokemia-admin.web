import axios from 'axios';

export default async function Un_Suspend_Salesperson(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/un_suspend_salesperson_account",payload)
    return result
}