import axios from 'axios';

export default async function Send_Sample_Email(payload) {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.post(" http://localhost:5001/api/sample_email",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemiaemailsmsserver-production.up.railway.app/api/sample_email`,payload)
    	return result
    }
}