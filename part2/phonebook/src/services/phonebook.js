import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (phoneObject) => {
    const request = axios.post(baseUrl, phoneObject)
    return request.then(response => response.data)
}

const update = (id, phoneObject) => {
    const request = axios.put(`${baseUrl}/${id}`, phoneObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }