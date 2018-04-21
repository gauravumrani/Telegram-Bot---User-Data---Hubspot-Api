const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var request = require('request');
var mongoose=require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const TelegramBot = require('./telegrambot');
const TelegramBotConfig = require('./telegrambotconfig');

const REST_PORT = (process.env.PORT || 3000);
const DEV_CONFIG ='true';
const APIAI_ACCESS_TOKEN = "dialogflow key";
const APIAI_LANG = "en";
const TELEGRAM_TOKEN = "telegram token";

const APP_NAME="server url"
var baseUrl = "";
if (APP_NAME) {
    // Heroku case
    baseUrl = APP_NAME;
} else {
    console.error('Set up the url of your service here and remove exit code!');
    process.exit(1);
}
//mongodb://localhost:27017/bot
mongoose.connect('mongodb://localhost:27017/bot');

const botConfig = new TelegramBotConfig(
    APIAI_ACCESS_TOKEN,
    APIAI_LANG,
    TELEGRAM_TOKEN);

botConfig.devConfig = DEV_CONFIG;

const bot = new TelegramBot(botConfig, baseUrl);
bot.start(() => {
    console.log("Bot started");
},
    (errStatus) => {
        console.error('It seems the TELEGRAM_TOKEN is wrong! Please fix it.')
});

app.post('/webhook', (req, res) => {
    console.log('POST webhook');

    try {
        bot.processMessage(req, res);
    } catch (err) {
        return res.status(400).send('Error while processing ' + err.message);
    }
});
app.listen(REST_PORT, () => console.log(`Webhook server is listening, port ${REST_PORT}`));