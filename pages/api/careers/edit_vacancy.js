import axios from 'axios';

export default async function Edit_Vacancy(payload) {
    const result = await axios.post("http://localhost:5001/api/edit_vacancy",payload)
    return result
}