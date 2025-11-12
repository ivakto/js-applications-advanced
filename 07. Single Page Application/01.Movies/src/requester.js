// fetch(url, option);

import { userUtils } from "./userUtils.js";

async function requester(method, url, data) {

    const option = {
        method: method
    }

    const headers = {};
    
    if (data) {
        headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    const userData = userUtils.getUserData();
    if (userData) {
        headers["X-Authorization"] = userData.accessToken;
    }

    option.headers = headers;
    
    try {
        const response = await fetch(url, option);

        if (response.status === 204) {
            return;
        }

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: `HTTP Error: ${response.status}` };
            }
            throw new Error(errorData.message || 'Request failed'); 
        }

        return response.json();

    } catch (error) {
        throw error;
    }
}

const get = (url) => requester("GET", url);
const post = (url, data) => requester("POST", url, data);
const update = (url, data) => requester("PUT", url, data);
const del = (url) => requester("DELETE", url);

// export {           // import {get, post, update, del}   get(.....)
//     get,
//     post,
//     update,
//     del
// }

// Правим ги само те да са достъпни   // import {api}    api.get(.....)
export const api = {
    get,
    post,
    update,
    del
};