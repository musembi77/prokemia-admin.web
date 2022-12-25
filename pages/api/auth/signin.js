import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function SignIn(payload) {
    const cookies = new Cookies();
    const result = await axios.post("http://localhost:5001/api/signin",payload)
    if(result.status === 201 || result.status === 500 ){
        return result
    }else{
        console.log(result.data)
        cookies.set('admin_token', result.data, { path: '/' });
        return result
    }
    return result
}