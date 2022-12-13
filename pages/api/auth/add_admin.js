import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Add_Admin(payload) {
    const result = await axios.post("http://localhost:5001/api/add_admin_user",payload)
    return result
}