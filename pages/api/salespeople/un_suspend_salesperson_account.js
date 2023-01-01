import axios from 'axios';

export default async function Un_Suspend_Salesperson(payload){
	const env = process.env.NODE_ENV
    console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5001/api/un_suspend_salesperson_account",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post("https://prokemia-adminserver-production.up.railway.app/api/un_suspend_salesperson_account",payload)
    	return result
    }
}