import axios from 'axios';

export default async function Edit_Technology(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/edit_technology",payload)
    return result
}