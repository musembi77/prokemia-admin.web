import axios from 'axios';

export default async function Delete_Technology(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/delete_technology",payload)
    return result
}