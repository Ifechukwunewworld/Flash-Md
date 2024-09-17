const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS01YYWdnb2xkRWp2c2tpbjJUMlI4VXNHVWNsNWFRd2pTdE94QVRWcXhtcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmROaGZYeVBpMG5TOHBTKzJCQ2UwckttNDh0V1pDK3FNMUk5Um5iRXBWTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQitmYkd4OWxOMXluRklJbFVuTVJSOXp0NXgzS2RjMVoxZVpxTm0vNEdVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEOXhtNUNHdVpCbUR3dzZnS3BGMUxBUlBGS1I3bmJIUzYweEl4Y215VEVJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVKS2R1c3FVQmpzZEJXdzJpc2E1alJzMFdNQWJxYlU1Q2c0S3BYRTNJVkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNkSmo3Vm9NSlIvT2R1R2hHeHlaOTYxUXdjYjBNeVdGQWVSTVdNM0I0U1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVB0L0ZINTJIV0tYNUN0MEtGdUNuNHVXa0hvUDFCdCsyemZuVFpEMG5IRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGVBTjRDTStoNlZzcWhzbnErZTgrU0pQRHhNVGF0RGpmR1FXckZGdzlSdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktteHBJSDNSbXUwSldXazRiUnNVd1N0M3lKUkdMcTVEaTkxeldEREdZSVd5N0dPSE95WGJremdkMUh2QmJKZVlsQWhWWU1USUVPdllLTlBnbGExWUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTgsImFkdlNlY3JldEtleSI6IkF5N1h2bEN5MmJDRnUzaXpvZzJJdmRLMW5vclk4VGJtS2lnclBGSm5Iem89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1NzE2OTExMjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjg0OTdCMDIwODNFNTJDODI2OEYzNTkyNTE0MEY0REYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjU3MTQyNn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiOVZOUXJYcnVSUHliNU1kOUlBNWlkQSIsInBob25lSWQiOiJmYjhmMTZkZi1hZjFiLTRiNWUtOTE1ZS02YTYyMDY4ZTgwZDYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYlZpejNSK2ZYS1ZRVUcyWUtZMzcxajZtT1c0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ4YTQ0RWNVWDJETUp5NjB5NjBuUSt0Z1BoQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJHSEtaMjFEMiIsIm1lIjp7ImlkIjoiMjI1NzE2OTExMjg6MzdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J+MufCfpotUaWR58J+luvCfkpUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ003RzFwRUdFSkRIcGJjR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkRhZEJBYW8wR3lCS2dsUTFGUXBBOXRWSXJLR2x2S0RKM2ptV0VscE1ibEE9IiwiYWNjb3VudFNpZ25hdHVyZSI6InJSOGxWTTE5Zk5ER1BXYzFQR0lORmZmRys2azJHMXdreVYzbU9HeTBDTnBWRXQwL0xUOUlJVmlNajB6K044ZVFFZ0lXdHM3Z1hmQm9jTUIzWWJOSkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhMkFnYVZQSXREckNVWjBNU3VtUUVqalRkM0hNbGNOTlk4dUNBOXVJWXZ3dDlWMFQ1ajBmQTdWNTBNSVRLOEFrclpsZW1pdHVJaTFHU3NvVHZ3RExDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTcxNjkxMTI4OjM3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlEyblFRR3FOQnNnU29KVU5SVUtRUGJWU0t5aHBieWd5ZDQ1bGhKYVRHNVEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY1NzE0MjEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQllQIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
