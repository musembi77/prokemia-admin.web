import axios from 'axios';

export default async function Suspend_Manufacturer(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/suspend_manufacturer_account",payload)
    return result
}