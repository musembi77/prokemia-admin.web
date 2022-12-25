import axios from 'axios';

export default async function Edit_Order(payload){
    const result = await axios.post("http://localhost:5001/api/edit_order",payload)
    return result
}