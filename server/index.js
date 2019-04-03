import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import getOffers from './modules';

const app = express();

// For cross domains
app.use(cors());
app.use(bodyParser.json());

app.post('/api/offers', (req, res) => {
    getOffers(req.body.data)
        .then(response => {
            console.log(response, 'response');
            return res.status(200).json(response.data);
        })
        .catch(err => {
            console.log(err, 'coming to err');
            return res.status(500).json(err);
        })
});

app.listen(2000, () => {
    console.log('App is running on port 2000');
});