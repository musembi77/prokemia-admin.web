import axios from 'axios';

export default async function Delete_Vacancy(payload) {
    const result = await axios.post("http://localhost:5001/api/delete_vacancy",payload)
    return result
}