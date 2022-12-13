import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function SignIn(payload) {
    const cookies = new Cookies();
    const result = await axios.post("http://localhost:5001/api/signin",payload)
    cookies.set('admin_token', result.data, { path: '/' });
    return result
}