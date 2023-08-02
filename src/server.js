import express from 'express';

const app = express();

// start cronjobs
import './cronjobs/index.js';

app.get('/', (req, res) => {
    res.status(200).send('ok');
});

export default app;
