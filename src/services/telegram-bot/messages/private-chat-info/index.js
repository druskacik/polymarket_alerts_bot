import { fileURLToPath } from 'url';
import { dirname } from 'path';

import sendTelegramMessage from '../../send-message.js';
import readFileAsync from '../../../../utils/read-file-async.js';

const sendNPrivateChatInfoMessage = async (chatID) => {
    try {

        console.log('Sending message to chat ID', chatID);
        
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const text = await readFileAsync(__dirname + '/message.mustache');

        await sendTelegramMessage(chatID, text);

    } catch (err) {
        console.log(err);
    }
};

export default sendNPrivateChatInfoMessage;
