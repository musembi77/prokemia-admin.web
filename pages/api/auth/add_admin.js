import axios from 'axios';

export default async function Add_Admin(payload) {
	const env = process.env.NODE_ENV
    console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5001/api/add_admin_user",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-adminserver-production.up.railway.app/api/add_admin_user`,payload)
    	return result
    }
}