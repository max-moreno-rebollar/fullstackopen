import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

const deletePerson = id => {
    const resource = `${baseUrl}/${id}`
    const request = axios.delete(resource)
    return request.then(res => res.data)
}

const updatePerson = (id, newObj) => {
    const resource = `${baseUrl}/${id}`
    const request = axios.put(resource, newObj)
    return request.then(res => res.data)
}


export default { getAll, create, deletePerson, updatePerson }