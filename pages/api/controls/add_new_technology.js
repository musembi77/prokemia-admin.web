import axios from 'axios';

export default async function Add_Technology(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/add_new_technology",payload)
    return result
}