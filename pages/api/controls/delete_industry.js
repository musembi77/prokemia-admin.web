import axios from 'axios';

export default async function Delete_Industry(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/delete_industry",payload)
    return result
}