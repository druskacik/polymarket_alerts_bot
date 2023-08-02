import { fileURLToPath } from 'url';
import { dirname } from 'path';

import axios from 'axios';

import Mustache from 'mustache';

import sendTelegramMessage from '../../send-message.js';
import sendTelegramPhoto from '../../send-photo.js';
import readFileAsync from '../../../../utils/read-file-async.js';

const getPictureAsBuffer = async (imageUrl) => {
    try {

        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
        });

        return response.data;
        
    } catch (err) {
        console.log(err);
        return null;
    }
}

const sendNewEventNotification = async (chatID, event) => {
    try {

        console.log('Sending message to chat ID', chatID);
        
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const templateTextLong = await readFileAsync(__dirname + '/message_long.mustache');
        const templateTextShort = await readFileAsync(__dirname + '/message_short.mustache');
        
        const textLong = Mustache.render(templateTextLong, {
            title: event.title,
            description: event.description,
            url: `https://polymarket.com/event/${event.slug}`,
        });

        const textShort = Mustache.render(templateTextShort, {
            title: event.title,
            url: `https://polymarket.com/event/${event.slug}`,
        });

        const imageUrl = event.image;
        const photo = await getPictureAsBuffer(imageUrl);

        if (photo) {
            await sendTelegramPhoto(chatID, textLong, textShort, photo);
        } else {
            await sendTelegramMessage(chatID, text);
        }

    } catch (err) {
        console.log(err);
    }
};

export default sendNewEventNotification;
