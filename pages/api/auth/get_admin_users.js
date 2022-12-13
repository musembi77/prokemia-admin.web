import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_Admin_Users(payload) {
    const result = await axios.get("http://localhost:5001/api/get_admin_users")
    return result
}