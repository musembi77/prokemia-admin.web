import axios from 'axios';

export default async function Approve_Manufacturer(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/approve_manufacturer_account",payload)
    return result
}