import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-2998d.firebaseio.com/'
});

instance.interceptors.request.use(req=>{console.log(req)
    return req})

export default instance;