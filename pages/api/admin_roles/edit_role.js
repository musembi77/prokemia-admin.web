import axios from 'axios';

export default async function Edit_Role(payload) {
	const env = process.env.NODE_ENV
    console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5001/api/edit_roles",payload)
    	return result;
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-adminserver-production.up.railway.app/api/edit_roles`,payload)
    	return result;
    }
}