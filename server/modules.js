const axios = require('axios');

const apiDriver = axios.create({
    baseURL: 'https://www.mydriver.com/api/v4',
    withCredentials: false,
    headers: {'Content-Type': 'application/json'}
});

export default data =>
    apiDriver.post('offers', {
        ...data
    }).catch(err => {
    console.log(err, 'coming to err');
    return res.status(500).json(err);
    });
