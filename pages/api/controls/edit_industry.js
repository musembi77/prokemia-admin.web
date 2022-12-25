import axios from 'axios';

export default async function Edit_Industry(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/edit_industry",payload)
    return result
}