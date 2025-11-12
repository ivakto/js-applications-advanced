// Тука ще се занимаваме само с логиката за user-a

import {api} from "./requester.js";

const endpoints = {
    login: "http://localhost:3030/users/login",
    register: "http://localhost:3030/users/register",
    logout: "http://localhost:3030/users/logout"
};

function register(data) {
    return api.post(endpoints.register, data);
}

function login(data) {
    return api.post(endpoints.login, data);
}

function logout() {
    return api.get(endpoints.logout);
}

export const userService = {
    register,
    login,
    logout
}