import { CronJob } from 'cron';

import onTick from './controller.js';

const job = new CronJob({
    cronTime: '* * * * *',
    onTick: onTick,
});

export default job
