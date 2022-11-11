const baseUrl = 'https://3yya.com/u/a7089cd69d020e1f/rest/app'

const httpGet = async (url) => {
    const response = await fetch(`${baseUrl}${url}`)
    return response.json()
}

const httpPostJson = async (url, param) => {
    const response = await fetch(`${baseUrl}${url}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json", // 表明内容是 JSON 格式
        },
        body: JSON.stringify(param), // 序列化对象
    })
    return response.json()
}

const httpPut = async (url, param) => {
    const response = await fetch(`${baseUrl}${url}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json", // 表明内容是 JSON 格式
        },
        body: JSON.stringify(param), // 序列化对象
    })
    return response.json()
}

const httpDelete = async (url) => {
    const response = await fetch(`${baseUrl}${url}`, {
        method: "delete",
    })
    return response.json()
}

export {
    httpGet,
    httpPostJson,
    httpPut,
    httpDelete
}