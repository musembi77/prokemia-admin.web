import axios from 'axios';

export default async function Get_Requests() {
    const result = await axios.get("http://localhost:5001/api/get_requests")
    return result
}