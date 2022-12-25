import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_SalesPeople() {
    const result = await axios.get("http://localhost:5001/api/get_salesperson_accounts")
    return result
}