import axios from 'axios';
import FormData from 'form-data';

const sendPhotoWithCaption = async (chatID, text, photo) => {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`;

        const formData = new FormData();
        formData.append('chat_id', chatID);
        formData.append('photo', photo, 'logo.png');
        formData.append('caption', text);
        formData.append('parse_mode', 'HTML');

        const response = await axios.post(url, formData, {
            headers: formData.getHeaders(),
        });

        return response;
    } catch (err) {
        throw err;
    }
};

const sendTelegramPhoto = async (chatID, textLong, textShort, photo) => {
    try {

        const response = await sendPhotoWithCaption(chatID, textLong, photo);
        return response;
    } catch (err) {
        try {
            if (err.response.data.description === 'Bad Request: message caption is too long') {

                console.log('Message caption is too long. Trying to send short message instead.');
                const response = await sendPhotoWithCaption(chatID, textShort, photo);
                return response;
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export default sendTelegramPhoto;
