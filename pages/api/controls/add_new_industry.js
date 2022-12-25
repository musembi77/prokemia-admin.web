import axios from 'axios';

export default async function Add_Industry(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/add_new_industry",payload)
    return result
}