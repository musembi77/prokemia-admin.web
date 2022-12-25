import axios from 'axios';

export default async function Approve_Industry(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/approve_suggested_technology",payload)
    return result
}