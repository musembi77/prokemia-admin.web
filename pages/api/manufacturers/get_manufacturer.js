import axios from 'axios';

export default async function Get_Manufacturer(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/get_manufacturer_account",payload)
    return result
}