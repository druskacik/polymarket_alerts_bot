import dotenv from "dotenv";

dotenv.config();

import onTick from "../src/cronjobs/fetch-new-events/controller.js";

onTick();