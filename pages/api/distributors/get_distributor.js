import axios from 'axios';

export default async function Get_Distributor(payload){
	console.log(payload)
    const result = await axios.post("http://localhost:5001/api/get_distributor_account",payload)
    return result
}