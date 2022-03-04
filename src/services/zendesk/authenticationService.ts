import axios from 'axios';

const makeZendeskRequest = async (path: string, method: string, payload?: object) => {
    const options = {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${process.env.EMAIL}/token:${process.env.APITOKEN}`).toString('base64')
        }
    }

    let res;

    try {
        if (method === 'GET') res = await axios.get(`${process.env.URL}${path}`, options);
        if (method === 'PUT') res = await axios.put(`${process.env.URL}${path}`, payload, options);
        if (method === 'POST') res = await axios.post(`${process.env.URL}${path}`, payload, options);
        return res.data;
    } catch (error) {
        console.log(`Request failed with error: ${error}`)
        if (error.response.status && error.response.status === 429) {
            console.log(`Time to restart ${error.response.headers['retry-after']/60} minutes`)
        }
        return;
    }

    return;
}

export default makeZendeskRequest;