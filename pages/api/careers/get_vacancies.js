import axios from 'axios';

export default async function Get_Vacancies(){
    const result = await axios.get("http://localhost:5001/api/get_vacancies")
    return result
}