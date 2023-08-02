import express from 'express';

import telegramWebhook from './routes/telegram-webhook.js';

const app = express();

app.use(express.json());

// start cronjobs
import './cronjobs/index.js';

app.get('/', (req, res) => {
    res.status(200).send('ok');
});

console.log('TELEGRAM_BOT_TOKEN', process.env.TELEGRAM_BOT_TOKEN)

app.use(`/api/telegram${process.env.TELEGRAM_BOT_TOKEN}`, telegramWebhook);

export default app;
