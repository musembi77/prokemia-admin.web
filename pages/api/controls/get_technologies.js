import axios from 'axios';

export default async function Get_Technologies(){
    const result = await axios.get("http://localhost:5001/api/get_technologies")
    return result
}