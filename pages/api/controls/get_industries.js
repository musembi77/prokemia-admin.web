import axios from 'axios';

export default async function Get_Industries(){
    const result = await axios.get("http://localhost:5001/api/get_industries")
    return result
}