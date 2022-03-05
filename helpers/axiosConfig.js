import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://my-app.test/api',
});

export default instance;