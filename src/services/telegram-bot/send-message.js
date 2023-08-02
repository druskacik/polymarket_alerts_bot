import axios from 'axios';

const sendTelegramMessage = async (chatID, text, parseMode = 'HTML', replyMarkup = undefined) => {
    try {

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: chatID,
            parse_mode: parseMode,
            text,
            disable_web_page_preview: 1,
            reply_markup: replyMarkup,
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

export default sendTelegramMessage;
