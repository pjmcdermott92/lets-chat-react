const api = async (url, body, method = 'GET') => {
    if (body) body = JSON.stringify(body);
    const requestUrl = `${process.env.REACT_APP_API_URL}/v1/${url}`;
    const headers = {
        'Content-Type': 'application/json'
    };

    return fetch(requestUrl, { method, headers, body, credentials: 'include' })
        .then(res => res.json())
        .then(result => {
            if (!result.success) throw new Error(result.message);
            return result;
        })
        .catch(err => Promise.reject({ success: false, message: err.message }));
}

export default api;
