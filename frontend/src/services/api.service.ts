type apiParams = {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
    headers?: any,
    url: string,
    body?: any
}

export const makeCall = async ({ url, method, headers = {}, body = {} }: apiParams) => {
    let configObj: RequestInit = { // Specify RequestInit type for configObj
        method,
        headers,
        credentials: 'include' as RequestCredentials // Explicitly cast 'include' to RequestCredentials type
    }
    if (method === 'PUT' || method === 'PATCH' || method === 'POST') {
        configObj.body = JSON.stringify(body);
    }
    const resp = await fetch(`http://localhost:5000/${url}`, configObj);

    return await resp.json();
}
