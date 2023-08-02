import getLatestEvents from "../../api/get-latest-events.js";
import checkAndAddNewEvents from "../../db/add-new-events.js";

import telegramBot from "../../services/telegram-bot/index.js";

const onTick = async () => {
    console.log('Running cronjob: fetch-new-events ...');
    try {

        const telegramChannelID = process.env.TELEGRAM_CHANNEL_ID;

        const events = await getLatestEvents();
        const newEvents = await checkAndAddNewEvents(events);

        if (process.env.SEED_MODE != '1') {
            for (const event of newEvents) {
                await telegramBot.sendNewEventNotification(telegramChannelID, event);
            }
        } else {
            console.log('Skipping Telegram notifications because SEED_MODE is enabled.');
        }

    } catch (err) {
        console.log(err);
    } finally {
        console.log('Finished cronjob: fetch-new-events.');
    }
}

export default onTick;