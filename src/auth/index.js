export function getToken() {
    const token = localStorage.getItem('token');
    return token;
}

export function getUser() {
    const user = localStorage.getItem('creator');
    return user;
}