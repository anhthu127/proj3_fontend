import { api_url } from './constants'

export async function makeRequestWithBody(url = '', data = {}, method) {
    console.log(api_url + url);
    const token = localStorage.getItem('token')
    const response = await fetch(api_url + url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            token: token
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
export async function makeRequest(url = '', method) {
    console.log(api_url + url);
    const token = localStorage.getItem('token')
    const response = await fetch(api_url + url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            token: token
        },
    })
    return response.json();
}
export async function LoginWith(url = '') {
    console.log(api_url + url);
    const token = localStorage.getItem('token')
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            token: token
        },
    })
    return response.json();
}

