import axios from 'axios';

export default async function Create_Invoice(payload){
    const result = await axios.post("http://localhost:5001/api/create_invoice",payload)
    return result
}