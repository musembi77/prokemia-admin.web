import axios from 'axios';

export default async function Suspend_Manufacturer(payload){
	const env = process.env.NODE_ENV
    console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5001/api/suspend_manufacturer_account",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post("https://prokemia-adminserver-production.up.railway.app/api/suspend_manufacturer_account",payload)
    	return result
    }
}