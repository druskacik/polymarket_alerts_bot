import express from 'express';

const router = express.Router();

import telegramBot from '../services/telegram-bot/index.js';

router.route('/')
    .post(async (req, res) => {

        try {

            const message = req.body.message || req.body.edited_message;

            if (!message) {
                res.status(200)
                    .end('ok');
                return;
            }

            const chatID = message.chat.id;
            await telegramBot.sendNPrivateChatInfoMessage(chatID);
            res.status(200)
                .end('ok');
            return;

        } catch (err) {
            console.log(req.body);
            console.log(err);
        }
    });

export default router;
