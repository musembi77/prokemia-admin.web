import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_Distributors() {
    const result = await axios.get("http://localhost:5001/api/get_distributor_accounts")
    return result
}